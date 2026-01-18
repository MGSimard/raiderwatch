import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements, userAc } from "better-auth/plugins/admin/access";

// https://www.better-auth.com/docs/plugins/admin#create-access-control

const statement = { ...defaultStatements, report: ["create", "assess"] } as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({ report: ["create", "assess"], ...adminAc.statements });
export const moderator = ac.newRole({ report: ["create", "assess"], ...userAc.statements });
export const user = ac.newRole({ report: ["create"], ...userAc.statements });
