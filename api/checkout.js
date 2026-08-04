export default function handler(req, res) {
    const { curso, desconto } = req.query;

    const links = {
        'ggsr': {
            '70': 'https://pay.voompcreators.com.br/12211/offer/CxC35L',
            '65': 'https://pay.voompcreators.com.br/12211/offer/VarJ4a',
            '60': 'https://pay.voompcreators.com.br/12211/offer/pzCSuq',
            '55': 'https://pay.voompcreators.com.br/12211/offer/DND0Wh',
            '50': 'https://pay.voompcreators.com.br/12211/offer/RsJrHo',
            '30': 'https://pay.voompcreators.com.br/12211/offer/PBZj8j',
        },
        'alpa': {
            '70': 'https://pay.voompcreators.com.br/13461/offer/woh3nv',
            '65': 'https://pay.voompcreators.com.br/13461/offer/bXfCrJ',
            '60': 'https://pay.voompcreators.com.br/13461/offer/GyxBxQ',
            '55': 'https://pay.voompcreators.com.br/13461/offer/tKzPhb',
            '50': 'https://pay.voompcreators.com.br/13461/offer/Kk3rk8',
            '30': 'https://pay.voompcreators.com.br/13461/offer/dHszhC',
        },
        'grac': {
            '70': 'https://pay.voompcreators.com.br/13469/offer/6hNGbu',
            '65': 'https://pay.voompcreators.com.br/13469/offer/PxIgo9',
            '60': 'https://pay.voompcreators.com.br/13469/offer/EnadZF',
            '55': 'https://pay.voompcreators.com.br/13469/offer/lDSde6',
            '50': 'https://pay.voompcreators.com.br/13469/offer/iYRga5',
            '30': 'https://pay.voompcreators.com.br/13469/offer/qitI39',
        },
        'iama': {
            '70': 'https://pay.voompcreators.com.br/14929/offer/lDBNEe',
            '65': 'https://pay.voompcreators.com.br/14929/offer/FkEKzB',
            '60': 'https://pay.voompcreators.com.br/14929/offer/599eTy',
            '55': 'https://pay.voompcreators.com.br/14929/offer/lPNxjQ',
            '50': 'https://pay.voompcreators.com.br/14929/offer/QFuLKb',
            '30': 'https://pay.voompcreators.com.br/14929/offer/p5Eu92',
        },
        'ida': {
            '70': 'https://pay.voompcreators.com.br/13467/offer/cnkr1i',
            '65': 'https://pay.voompcreators.com.br/13467/offer/0sZFpK',
            '60': 'https://pay.voompcreators.com.br/13467/offer/8Kmsc8',
            '55': 'https://pay.voompcreators.com.br/13467/offer/vcZsJm',
            '50': 'https://pay.voompcreators.com.br/13467/offer/g5eM6i',
            '30': 'https://pay.voompcreators.com.br/13467/offer/XvQtaA',
        }
    };

    if (!curso || !desconto) {
        return res.status(400).send('Parâmetros curso e desconto são obrigatórios.');
    }

    const cursoLinks = links[curso.toLowerCase()];
    if (!cursoLinks) {
        return res.status(404).send('Curso não encontrado.');
    }

    const checkoutUrl = cursoLinks[desconto];
    if (!checkoutUrl) {
        return res.status(404).send('Desconto inválido ou link não configurado.');
    }

    // Redirect the user securely to the checkout URL
    return res.redirect(302, checkoutUrl);
}
