export default function Head() {
  const baseUrl = 'https://webvy.online';
  const url = `${baseUrl}/privacy-policy`;

  return (
    <>
      <title>Політика конфіденційності | WebVy</title>
      <meta
        name="description"
        content="Політика конфіденційності WebVy: як ми збираємо, зберігаємо та захищаємо ваші персональні дані при використанні сайту та форми замовлення."
      />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="uk" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="ru" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </>
  );
}
