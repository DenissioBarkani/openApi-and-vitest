type UserInfo = {
  name: string;
  email: string;
};

export function formatUser(user: UserInfo): string {
  const name = user.name.trim();
  const email = user.email.trim().toLowerCase();

  return `${name} — ${email}`;
}
