import { authEvent, auth } from "../settings/global";

exports.authTrigger = authEvent.onCreate(async (user, context) => {
    await auth.setCustomUserClaims(user.uid, {role: 'user'});
});