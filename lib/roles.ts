const roles = {
    "PRODU": { color: "produ" },
    "REPO": { color: "repo" },
    "REDA": { color: "reda" },
    "PROMO": { color: "promo" },
    "MONTE": { color: "monte" },
    "OPE": { color: "ope" },
    "FOTO": { color: "foto" },
    "GRAFIKA": { color: "grafika" }
}

type Role = keyof typeof roles;

export function getRoleColor(role: string) {
    // Sprawdzamy, czy rola istnieje w obiekcie
    if (role in roles) {
        return roles[role as Role].color;
    }
    
    // Zwracamy wartość domyślną lub rzucamy błąd, jeśli rola nie istnieje
    return "default-color"; 
}