const logout = async () => {
  try {
    const response = await fetch("/api/customer/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert((await response.json()).message);
    }
  } catch (err) {
    alert(err.message);
  }
};

document.querySelector("#logout").addEventListener("click", logout);

document.querySelector("#logout-dropdown").addEventListener("click", logout);
