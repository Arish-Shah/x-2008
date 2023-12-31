import { z } from "zod";
import { signupSchema } from "./auth";

export const accountSettingsSchema = z.object({
  name: z.string().max(20, "Your name must be less than 20 chars.").nullable(),
  username: signupSchema.shape.username.nullable(),
  email: signupSchema.shape.email,
  password: z.string().nullable(),
  web: z.string().nullable(),
  bio: z.string().max(160, "Your bio must be less than 160 chars.").nullable(),
  location: z
    .string()
    .max(30, "Your location must be less than 30 chars.")
    .nullable(),
  protected: z.boolean(),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z.string().min(6, "At least 6 chars."),
    verifyPassword: z.string().min(1, "Re-enter new password."),
  })
  .refine((data) => data.newPassword === data.verifyPassword, {
    message: "Passwords do not match.",
    path: ["verifyPassword"],
  });

export const pictureSchema = z.object({
  picture: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "Please select an image.")
    .refine(
      (files) =>
        ["image/jpeg", "image/jpg", "image/gif", "image/png"].includes(
          files?.[0]?.type
        ),
      "Only JPG, GIF, PNG are allowed."
    )
    .refine((files) => files?.[0]?.size < 700 * 1024, "Maximum size of 700k."),
});

export const designSchema = z.object({
  backgroundFile: z.union([
    z
      .custom<FileList>()
      .refine(
        (files) =>
          files?.length === 0 ||
          ["image/jpeg", "image/jpg", "image/gif", "image/png"].includes(
            files?.[0]?.type
          ),
        "Only JPG, GIF, PNG are allowed."
      )
      .refine(
        (files) => files?.length === 0 || files?.[0]?.size < 800 * 1024,
        "Maximum size of 800k."
      ),
    z.undefined(),
  ]),
  background: z.string().length(7).regex(/^#/),
  backgroundImage: z.string(),
  sidebar: z.string().length(7).regex(/^#/),
  sidebarBorder: z.string().length(7).regex(/^#/),
  links: z.string().length(7).regex(/^#/),
  text: z.string().length(7).regex(/^#/),
  tile: z.boolean(),
});
