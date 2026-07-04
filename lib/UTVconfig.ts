const roles = {
    "PRODU": { color: "produ" },
    "REPO": { color: "repo" },
    "REDA": { color: "reda" },
    "PROMO": { color: "promo" },
    "MONTE": { color: "monte" },
    "OPE": { color: "ope" },
    "FOTO": { color: "foto" },
    "GRAFIKA": { color: "grafika" }
} as const;

const statuses = {
    "NEW": ["Nowy materiał", "primary"],
    "PRODUCTION": ["Realizacja materiału", "success"],
    "POSTPRODUCTION": ["W trakcie montażu", "warning"],
    "REVIEW": ["W kolaudacji", "warning"],
    "REVIEW_PASSED": ["Po kolaudacji", "success"],
    "PUBLISHED": ["Opublikowany", "dark"]
} as const;

type RoleKey = keyof typeof roles;
type StatusKey = keyof typeof statuses;

export function getRoleColor(role: string): string {
    return role in roles ? roles[role as RoleKey].color : "primary";
}

export function getRoles(): string[] {
    return Object.keys(roles);
}

export function getStatuses(): Record<string, string> {
    const statusy: Record<string, string> = {};
    for (const status in statuses) {
        statusy[status] = statuses[status as StatusKey][0];
    }
    return statusy;
}

export function getFullStatuses() {
    return statuses;
}

export function getStatusColor(status: string): string {
    return status in statuses ? statuses[status as StatusKey][1] : "primary";
}

export function getStatusName(status: string): string {
    return status in statuses ? statuses[status as StatusKey][0] : status;
}