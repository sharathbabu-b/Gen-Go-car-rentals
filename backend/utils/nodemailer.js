import nodemailer from "nodemailer"
const sendEmail=async(user)=>{
    console.log(user.email)
    try{
        const transporter=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASSWORD
            }

        })
        const mailOptions={
            from:process.env.EMAIL_USER,
            to:user.email,
            subject:'Reset your Password',
            text:user.message


        }
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully")
    }catch(error){
        console.log('Error sending email:',error);
        throw error
    }
}
export default sendEmail