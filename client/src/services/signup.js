import supabase from "./supabase";

const signup = async ({ email, password }) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error);
    return { success: true, data: null };
  } catch ({ message }) {
    const alertMessage =
      message === "AuthApiError: User already registered"
        ? "Acest e-mail este deja asociat unui cont."
        : "A apǎrut o problemǎ. Încearcǎ din nou.";

    return { success: false, data: alertMessage };
  }
};

export { signup };
