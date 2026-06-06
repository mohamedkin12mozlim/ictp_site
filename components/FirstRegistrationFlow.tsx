const saveToSupabase = async () => {

  try {

    const { data, error } = await supabase
      .from('registrations')
      .insert([
        {
          full_name_ar: formData.nameAr,
          full_name_en: formData.nameEn,
          national_id: formData.nationalId,
          phone: formData.whatsapp,
          email: formData.email,
          college: formData.faculty
        }
      ])
      .select();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      alert(error.message);
      return false;
    }

    return true;

  } catch (err) {

    console.log("CATCH ERROR:", err);

    alert("حصل خطأ");

    return false;
  }
};