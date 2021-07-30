//referenced from https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del
export const refreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 -5 * 60) * 1000;

    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

        setTimeout(refreshToken, refreshTiming);
    }

    setTimeout(refreshToken, refreshTiming);
}