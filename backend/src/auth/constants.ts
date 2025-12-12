export const jwtConstants: { secret: string; expiresIn: string } = {
  secret: process.env.JWT_SECRET || 'troque_essa_chave_supersecreta',
  expiresIn: '15m',
};
