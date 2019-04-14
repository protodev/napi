export function napiPathToClaudia(path: string): string {
    let claudiaPath = '';
    const pathParts = path.split('/');

    pathParts.forEach((part, idx) => {
        if(!part) {
            return;
        }

        if (part.indexOf(':') !== -1) {
            part = part.replace(':', '');
            part = `{${part}}`
        }
        
        claudiaPath += `/${part}`;
    });

    return claudiaPath;
}

export function claudiaPathToNapi(path: string): string {
    let napiPath = '';
    const pathParts = path.split('/');

    pathParts.forEach((part) => {
        if(!part) {
            return;
        }

        if (part.indexOf('{') !== -1 && part.indexOf('}') !== -1) {
            part = part.replace('{', '');
            part = part.replace('}', '');
            part = `:${part}`
        }
        
        napiPath += `/${part}`;
    });

    return napiPath;
}