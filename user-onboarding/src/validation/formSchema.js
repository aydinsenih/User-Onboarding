import * as yup from "yup";

export default yup.object().shape({
    name: yup
        .string()
        .required("Name is required")
        .min(2, "Name must be at least 2 chars long"),
    email: yup.string().email("must be an email").required("email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 character long"),

    role: yup
    .string()
    .oneOf(["admin","user","mod","owner"], "select a role"),
    tos: yup.boolean().oneOf([true], "Terms of Service must be accepted."),
});
