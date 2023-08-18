import jwt from "jsonwebtoken";

export const generateJWT = async (id: string = ""): Promise<string> => {
  return new Promise((res, rej) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.SECRETPASS as string,
      {
        expiresIn: "30m",
      },
      (error: Error | null, token: string | undefined) => {
        if (error) {
          console.log(error);
          rej("No se pudo generar el token");
        } else {
          res(token as string);
        }
      }
    );
  });
};
