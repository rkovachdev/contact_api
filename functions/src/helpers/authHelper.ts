import { auth, db } from "../settings/global";

export async function createUser(email: string, password: string, firstName: string, lastName: string, phone: string): Promise<string | undefined> {
    try {
        const user = await auth.createUser({ email: email, password: password, displayName: `${firstName} ${lastName}` });
        db.collection('users').add({ email: user.email, firstName: firstName, lastName: lastName, uid: user.uid, fullName: user.displayName, phone: phone })
        return user.uid;
    } catch (error) {
        return undefined;
    }
}

export async function getCustomClaim(uid: string): Promise<string | undefined> {
    try {
        const user = await auth.getUser(uid);

        if (user.customClaims == undefined) {
            return undefined;
        } else {
            const { role } = user.customClaims;
            return role;
        }
    } catch (error) {
        return undefined;
    }
}

