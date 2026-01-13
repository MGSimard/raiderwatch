import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements, userAc } from "better-auth/plugins/admin/access";
import { auth } from ".";

// https://www.better-auth.com/docs/plugins/admin#create-access-control

const statement = { ...defaultStatements, report: ["create", "assess"] } as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({ report: ["create", "assess"], ...adminAc.statements });
export const moderator = ac.newRole({ report: ["create", "assess"], ...userAc.statements });
export const user = ac.newRole({ report: ["create"], ...userAc.statements });

// PERMISSION CHECK ON CLIENT
// const { data, error } = await authClient.admin.hasPermission({
//   userId: "user-id",
//   permission: { "project": ["create", "update"] }, // Must use this, or permissions
//   permissions,
// });

// PERMISSION CHECK ON SERVER
// const data = await auth.api.userHasPermission({
//   body: {
//       userId: "user-id",
//       role: "admin", // server-only
//       permission: { "project": ["create", "update"] }, // Must use this, or permissions
//       permissions,
//   },
// });
