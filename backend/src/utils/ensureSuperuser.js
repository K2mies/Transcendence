import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

export const ensureSuperuser = async () => {
  const existing = await prisma.user.findFirst({
    where: { role: "SUPERUSER" },
  });

  if (existing) {
    return;
  }

  const { SUPERUSER_NAME, SUPERUSER_EMAIL, SUPERUSER_PASSWORD } = process.env;

  if (!SUPERUSER_NAME || !SUPERUSER_EMAIL || !SUPERUSER_PASSWORD) {
    console.error(
      "No superuser exists and SUPERUSER_NAME/SUPERUSER_EMAIL/SUPERUSER_PASSWORD are not set — skipping bootstrap",
    );
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(SUPERUSER_PASSWORD, salt);

  await prisma.user.create({
    data: {
      name: SUPERUSER_NAME,
      email: SUPERUSER_EMAIL,
      password: hashedPassword,
      role: "SUPERUSER",
    },
  });

  console.log(`Superuser "${SUPERUSER_NAME}" created`);
};
