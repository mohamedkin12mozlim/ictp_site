import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
 process.env.VITE_SUPABASE_URL!,
 process.env.VITE_SUPABASE_ANON_KEY!
);

export const handler = async (event:any) => {

try {

const { email } = JSON.parse(event.body);

const otp = Math.floor(
100000 + Math.random() * 900000
).toString();

const expiryTime = new Date(
Date.now() + 10 * 60 * 1000
).toISOString();

await supabase
.from("email_verifications")
.upsert({
email,
otp,
expires_at: expiryTime
});

await resend.emails.send({

from:"onboarding@resend.dev",

to:email,

subject:"كود التحقق",

html:`
<div style="font-family:Arial;text-align:center">

<h2>كود التحقق الخاص بك</h2>

<div style="
font-size:35px;
font-weight:bold;
letter-spacing:8px;
padding:20px;
background:#f3f3f3;
border-radius:12px;
display:inline-block;
">

${otp}

</div>

<p>الكود صالح لمدة 10 دقائق</p>

</div>
`

});

return {

statusCode:200,

body:JSON.stringify({
success:true
})

};

}

catch(err:any){

console.log(err);

return {

statusCode:500,

body:JSON.stringify({
success:false,
error:err.message
})

};

}

};