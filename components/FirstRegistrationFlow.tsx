
//--------------------------------
const saveToSupabase = async () => {
const { data, error } = await supabase
  .from('registrations')
  .upsert(
    [
      {
        full_name_ar: formData.nameAr,
        full_name_en: formData.nameEn,
        national_id: formData.nationalId,
        phone: formData.whatsapp,
        email: formData.email,
        college: formData.faculty
      }
    ],
    {
      onConflict: 'email'
    }
  )
  .select();

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

@@ -277,6 +276,7 @@ const { data, error } = await supabase
} catch (err) {

console.log("CATCH ERROR:", err);

alert("حصل خطأ");

return false;