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
            email,
            telefone,
            area,
            graduacao,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_term,
            utm_content
        } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Prepare field values array
        const fieldValues = [
            { field: "437", value: utm_source || "" },
            { field: "438", value: utm_campaign || "" },
            { field: "439", value: utm_medium || "" },
            { field: "440", value: utm_term || "" },
            { field: "441", value: utm_content || "" },
            { field: "442", value: new Date().toISOString() }
        ];

        if (graduacao) {
            fieldValues.push({ field: "443", value: graduacao });
        }
        if (area) {
            fieldValues.push({ field: "444", value: area });
        }

        const syncPayload = {
            contact: {
                email: email,
                firstName: nome || "",
                phone: telefone || "",
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
                // Non-fatal error, but we log it
            }
        }

        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error("Error processing subscribe request:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
