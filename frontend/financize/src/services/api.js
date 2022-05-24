export const loginUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/");
      const data = await response.json();
      console.log(data)
      return data;
    } catch (e) {
      console.log(e);
    }
  };