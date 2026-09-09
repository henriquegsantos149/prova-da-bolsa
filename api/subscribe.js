export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const API_KEY = process.env.ACTIVE_API_KEY;
    const API_URL = 'https://ambientalpro.api-us1.com/api/3';

    if (!API_KEY) {
        console.error("Missing ACTIVE_API_KEY environment variable");
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    try {
        const {
            nome,
            name,
            email,
            telefone,
            phone,
            whatsapp,
            area,
            graduacao,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_term,
            utm_content
        } = req.body;

        const cleanEmail = (email || '').trim().toLowerCase();
        if (!cleanEmail) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Separa firstName e lastName
        const fullName = (nome || name || '').trim();
        const nameParts = fullName.split(/\s+/);
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ');

        // Sanitiza telefone: remove caracteres especiais e DDI 55 se houver
        const rawPhone = (telefone || phone || whatsapp || '').toString().trim();
        let digitsOnly = rawPhone.replace(/\D/g, '');
        let cleanPhone = digitsOnly;
        if (digitsOnly.startsWith('55') && (digitsOnly.length === 12 || digitsOnly.length === 13)) {
            cleanPhone = digitsOnly.substring(2);
        }

        // Helper para adicionar campos apenas se tiverem valor preenchido (não sobrescreve com vazio)
        const addField = (fieldsArray, fieldId, value) => {
            if (value !== undefined && value !== null && String(value).trim() !== '') {
                fieldsArray.push({ field: String(fieldId), value: String(value).trim() });
            }
        };

        const fieldValues = [];
        addField(fieldValues, "437", utm_source);
        addField(fieldValues, "438", utm_campaign);
        addField(fieldValues, "439", utm_medium);
        addField(fieldValues, "440", utm_term);
        addField(fieldValues, "441", utm_content);
        addField(fieldValues, "442", new Date().toISOString());
        addField(fieldValues, "443", graduacao);
        addField(fieldValues, "444", area);

        const syncPayload = {
            contact: {
                email: cleanEmail,
                firstName: firstName,
                lastName: lastName,
                phone: cleanPhone,
                fieldValues: fieldValues
            }
        };

        // 1. Sync Contact
        const syncResponse = await fetch(`${API_URL}/contact/sync`, {
            method: 'POST',
            headers: {
                'Api-Token': API_KEY,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(syncPayload)
        });

        if (!syncResponse.ok) {
            const errorData = await syncResponse.text();
            console.error("ActiveCampaign Sync Error:", errorData);
            return res.status(syncResponse.status).json({ message: 'Error syncing contact', details: errorData });
        }

        const syncData = await syncResponse.json();
        const contactId = syncData?.contact?.id;

        // 2. Add Tag (300 = [Bolsa de Estudos] Lead)
        if (contactId) {
            const tagPayload = {
                contactTag: {
                    contact: contactId,
                    tag: "300"
                }
            };

            const tagResponse = await fetch(`${API_URL}/contactTags`, {
                method: 'POST',
                headers: {
                    'Api-Token': API_KEY,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(tagPayload)
            });

            if (!tagResponse.ok) {
                const tagErrorData = await tagResponse.text();
                console.error("ActiveCampaign Tag Error:", tagErrorData);
                // Non-fatal error, mas logado
            }
        }

        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error("Error processing subscribe request:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
