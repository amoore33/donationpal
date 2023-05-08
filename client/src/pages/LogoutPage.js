function LogoutPage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('_id');
    window.location.replace('/');
}

export default LogoutPage;