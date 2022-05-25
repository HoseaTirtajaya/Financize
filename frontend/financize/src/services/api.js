export const loginUser = async (email, password) => {
  try {
      console.log(email, password, "WAKLDJALWDJKOPAWIKj")
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      console.log(data, "INI DARI SERVICES")
      return data;
    } catch (e) {
      console.log(e);
    }
  };