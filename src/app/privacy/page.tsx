import Navigation from '@/components/Navigation';
import Footer from '@/components/sections/Footer';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Політика конфіденційності | Draft2Live',
  description: 'Політика конфіденційності Draft2Live — обробка персональних даних відповідно до GDPR і польського законодавства про захист персональних даних.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/" className="text-primary text-sm hover:underline mb-8 inline-block">&larr; На головну</Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Політика конфіденційності</h1>
          <p className="text-text-muted text-sm mb-12">Останнє оновлення: 10 квітня 2026</p>

          <div className="prose-legal space-y-8 text-text-secondary text-[15px] leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Загальні положення</h2>
              <p>Ця Політика конфіденційності пояснює, як компанія Aklima Polska sp. z o.o., із зареєстрованим офісом у Варшаві (ul. Postępu 15, 02-676 Warszawa, KRS: 0000978391, NIP: 9512544995, REGON: 522520422) (далі — &laquo;Оператор&raquo;, &laquo;ми&raquo;), яка керує платформою Draft2Live (далі — &laquo;Платформа&raquo;), збирає, обробляє, зберігає та захищає ваші персональні дані відповідно до Загального регламенту про захист даних (Регламент (ЄС) 2016/679, далі — &laquo;GDPR&raquo;) та польського Закону про захист персональних даних від 10 травня 2018 року.</p>
              <p className="mt-3">Користуючись Платформою, ви підтверджуєте, що ознайомилися з цією Політикою. Якщо ви не згодні з умовами обробки даних, будь ласка, не користуйтеся Платформою.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Контролер даних</h2>
              <div className="p-4 rounded-xl bg-white/5 border border-border">
                <p><strong className="text-white">Aklima Polska sp. z o.o.</strong></p>
                <p className="mt-1">ul. Postępu 15, 02-676 Warszawa, Polska</p>
                <p className="mt-1">KRS: 0000978391 | NIP: 9512544995 | REGON: 522520422</p>
                <p className="mt-1">Платформа: Draft2Live</p>
                <p className="mt-1">Email: <a href="mailto:info@draft2live.ai" className="text-primary hover:underline">info@draft2live.ai</a></p>
                <p className="mt-1">Сайт: <a href="https://draft2live.ai" className="text-primary hover:underline">draft2live.ai</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Які дані ми збираємо</h2>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">3.1. Дані, які ви надаєте безпосередньо</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong className="text-white">Реєстраційні дані:</strong> ім&apos;я, прізвище, email, пароль</li>
                <li><strong className="text-white">Платіжні дані:</strong> інформація про кредитну/дебетову картку, адреса для виставлення рахунку (обробляється через сертифікованого платіжного провайдера)</li>
                <li><strong className="text-white">Дані профілю:</strong> назва компанії, сайт, налаштування мови, Brand Voice</li>
                <li><strong className="text-white">Завантажені файли:</strong> документи Бази знань, зображення, тексти для обробки</li>
                <li><strong className="text-white">Дані комунікації:</strong> повідомлення до служби підтримки, відгуки</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">3.2. Дані, які збираються автоматично</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong className="text-white">Технічні дані:</strong> IP-адреса, тип і версія браузера, операційна система, роздільна здатність екрана</li>
                <li><strong className="text-white">Дані використання:</strong> відвідані сторінки, тривалість сесії, дії на Платформі, кількість згенерованих статей</li>
                <li><strong className="text-white">Cookies та подібні технології:</strong> детальніше — в нашій <Link href="/cookies" className="text-primary hover:underline">Політиці cookies</Link></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Цілі та правові підстави обробки</h2>
              <p>Ми обробляємо ваші персональні дані на таких правових підставах (стаття 6 GDPR):</p>

              <div className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-border">
                  <p><strong className="text-white">Виконання договору (ст. 6(1)(b) GDPR)</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Створення та керування вашим Акаунтом</li>
                    <li>Надання послуг Платформи (генерація контенту, SEO-оптимізація, публікація)</li>
                    <li>Обробка платежів і виставлення рахунків</li>
                    <li>Технічна підтримка</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-border">
                  <p><strong className="text-white">Законні інтереси (ст. 6(1)(f) GDPR)</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Покращення та розвиток Платформи</li>
                    <li>Аналітика використання та продуктивності</li>
                    <li>Забезпечення безпеки та запобігання шахрайству</li>
                    <li>Надсилання сервісних сповіщень щодо роботи Платформи</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-border">
                  <p><strong className="text-white">Згода (ст. 6(1)(a) GDPR)</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Маркетингові розсилки та SEO-поради</li>
                    <li>Аналітичні та маркетингові cookies</li>
                    <li>Обробка даних для персоналізованих рекомендацій</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-border">
                  <p><strong className="text-white">Юридичний обов&apos;язок (ст. 6(1)(c) GDPR)</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Ведення бухгалтерського та податкового обліку</li>
                    <li>Дотримання законодавчих вимог щодо захисту даних</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Передача даних третім сторонам</h2>
              <p>Для надання Послуг ми передаємо ваші дані сторонним постачальникам послуг (обробникам даних). Нижче — категорії одержувачів і конкретні сервіси.</p>

              <div className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-border">
                  <h3 className="text-lg font-semibold text-white mt-6 mb-2">Інфраструктура та хостинг</h3>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong className="text-white">Hetzner Online GmbH</strong> (Німеччина/ЄС) &mdash; серверна інфраструктура та зберігання даних</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-border">
                  <h3 className="text-lg font-semibold text-white mt-6 mb-2">ШІ-сервіси</h3>
                  <p>Платформа використовує <strong className="text-white">OpenRouter, Inc.</strong> (США) як єдиний API-шлюз для доступу до моделей штучного інтелекту. Через OpenRouter ваш контент може оброблятися такими провайдерами:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong className="text-white">Anthropic</strong> (США) &mdash; Claude: генерація тексту, гуманізація контенту</li>
                    <li><strong className="text-white">OpenAI</strong> (США) &mdash; GPT: генерація тексту, переклад, ембеддинги (векторний пошук), генерація зображень</li>
                    <li><strong className="text-white">Google</strong> (США) &mdash; Gemini: генерація тексту та зображень</li>
                    <li><strong className="text-white">Meta</strong> (США) &mdash; Llama: генерація тексту</li>
                    <li><strong className="text-white">Mistral AI</strong> (Франція/ЄС) &mdash; генерація тексту</li>
                    <li><strong className="text-white">Black Forest Labs</strong> (FLUX) &mdash; генерація зображень</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-border">
                  <h3 className="text-lg font-semibold text-white mt-6 mb-2">Виявлення ШІ та якість контенту</h3>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong className="text-white">GPTZero</strong> (США) &mdash; перевірка тексту на ШІ-маркери</li>
                    <li><strong className="text-white">ZeroGPT</strong> &mdash; альтернативний детектор ШІ-тексту</li>
                    <li><strong className="text-white">Winston AI</strong> &mdash; виявлення ШІ-контенту</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-border">
                  <h3 className="text-lg font-semibold text-white mt-6 mb-2">Обробка медіа</h3>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong className="text-white">Replicate, Inc.</strong> (США) &mdash; підвищення роздільної здатності зображень (upscaling)</li>
                    <li><strong className="text-white">Kling AI</strong> &mdash; генерація відео з тексту та зображень</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-border">
                  <h3 className="text-lg font-semibold text-white mt-6 mb-2">SEO та аналіз контенту</h3>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong className="text-white">Serpstat</strong> &mdash; дослідження ключових слів, обсяг пошуку, аналіз конкурентів</li>
                    <li><strong className="text-white">Jina AI</strong> (Німеччина/ЄС) &mdash; вилучення тексту з вебсторінок для аналізу конкурентів</li>
                    <li><strong className="text-white">Tavily</strong> &mdash; вебпошук і збір даних для досліджень</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-border">
                  <h3 className="text-lg font-semibold text-white mt-6 mb-2">Платежі</h3>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong className="text-white">Stripe, Inc.</strong> (США) &mdash; обробка платежів, підписки, керування виставленням рахунків. Дані карток обробляються виключно Stripe (PCI DSS Level 1) і не зберігаються на наших серверах.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-border">
                  <h3 className="text-lg font-semibold text-white mt-6 mb-2">Аналітика та маркетинг</h3>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong className="text-white">Google Analytics</strong> (Google LLC, США) &mdash; аналіз трафіку та використання Платформи</li>
                    <li><strong className="text-white">Meta Pixel</strong> (Meta Platforms, Inc., США) &mdash; вимірювання ефективності реклами</li>
                    <li><strong className="text-white">Google Ads</strong> (Google LLC, США) &mdash; відстеження конверсій</li>
                    <li><strong className="text-white">LinkedIn Insight Tag</strong> (LinkedIn Corp., США) &mdash; аналітика рекламних кампаній</li>
                  </ul>
                  <p className="mt-2">Ці сервіси використовують cookies. Деталі — у нашій <Link href="/cookies" className="text-primary hover:underline">Політиці cookies</Link>.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-border">
                  <h3 className="text-lg font-semibold text-white mt-6 mb-2">Сповіщення</h3>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong className="text-white">Telegram Bot API</strong> (Telegram FZ-LLC, ОАЕ) &mdash; сервісні сповіщення для адміністраторів Платформи</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-border">
                  <h3 className="text-lg font-semibold text-white mt-6 mb-2">Опціональні інтеграції (на розсуд Користувача)</h3>
                  <p>Наведені нижче сервіси активуються лише якщо Користувач підключає власний API-ключ. У такому випадку Користувач вступає у прямі договірні відносини з відповідним провайдером:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong className="text-white">DeepL SE</strong> (Німеччина/ЄС) &mdash; автоматизований переклад контенту</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <h3 className="text-lg font-semibold text-white mt-6 mb-2">Важливе застереження щодо сторонніх сервісів</h3>
                <p>Ми передаємо стороннім провайдерам лише ті дані, які необхідні для виконання конкретної функції (принцип мінімізації даних, ст. 5(1)(c) GDPR). <strong className="text-white">Ми не зберігаємо дані від імені сторонніх провайдерів і не контролюємо їхні практики обробки даних після того, як дані передано.</strong></p>
                <p className="mt-2">Кожен сторонній провайдер є самостійним контролером або обробником даних і діє згідно з власною політикою конфіденційності. Зокрема, але не виключно:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>OpenAI &mdash; <a href="https://openai.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">openai.com/privacy</a></li>
                  <li>Google &mdash; <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></li>
                  <li>Anthropic &mdash; <a href="https://www.anthropic.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">anthropic.com/privacy</a></li>
                  <li>Stripe &mdash; <a href="https://stripe.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">stripe.com/privacy</a></li>
                  <li>Meta &mdash; <a href="https://www.facebook.com/privacy/policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">facebook.com/privacy/policy</a></li>
                </ul>
                <p className="mt-2"><strong className="text-white">Оператор не несе відповідальності за практики обробки персональних даних сторонніми провайдерами</strong> після належної передачі даних відповідно до умов DPA. Радимо ознайомитися з їхніми політиками конфіденційності.</p>
              </div>

              <p className="mt-4">З усіма обробниками даних, яким передаються персональні дані, укладено Договори про обробку даних (DPA) відповідно до ст. 28 GDPR.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Міжнародна передача даних</h2>
              <p>Деякі з наших провайдерів розташовані за межами Європейської економічної зони (ЄЕЗ). У таких випадках ми забезпечуємо належний рівень захисту даних шляхом:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Стандартних договірних положень, схвалених Європейською Комісією</li>
                <li>Рішень про адекватність, прийнятих Європейською Комісією</li>
                <li>Додаткових технічних та організаційних заходів відповідно до рекомендацій EDPB</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Строки зберігання даних</h2>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong className="text-white">Дані Акаунту:</strong> протягом усього часу існування Акаунту та 30 днів після його видалення</li>
                <li><strong className="text-white">Платіжні дані:</strong> відповідно до вимог податкового законодавства (зазвичай до 10 років)</li>
                <li><strong className="text-white">Аналітичні дані:</strong> до 26 місяців</li>
                <li><strong className="text-white">Маркетингова згода:</strong> до моменту її відкликання</li>
                <li><strong className="text-white">Завантажені файли:</strong> протягом усього часу існування Акаунту; видаляються протягом 30 днів після видалення Акаунту</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Ваші права</h2>
              <p>Згідно з GDPR, ви маєте такі права щодо своїх персональних даних:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong className="text-white">Право доступу</strong> (ст. 15 GDPR) &mdash; отримати копію своїх персональних даних</li>
                <li><strong className="text-white">Право на виправлення</strong> (ст. 16 GDPR) &mdash; виправити неточні або неповні дані</li>
                <li><strong className="text-white">Право на видалення</strong> (ст. 17 GDPR) &mdash; &laquo;право бути забутим&raquo;</li>
                <li><strong className="text-white">Право на обмеження обробки</strong> (ст. 18 GDPR)</li>
                <li><strong className="text-white">Право на перенесення даних</strong> (ст. 20 GDPR)</li>
                <li><strong className="text-white">Право на заперечення</strong> (ст. 21 GDPR)</li>
                <li><strong className="text-white">Право на відкликання згоди</strong> (ст. 7(3) GDPR)</li>
              </ul>
              <p className="mt-4">Щоб скористатися будь-яким із цих прав, напишіть на <a href="mailto:info@draft2live.ai" className="text-primary hover:underline">info@draft2live.ai</a>. Ми відповімо протягом 30 днів.</p>
              <p className="mt-3">Ви також маєте право подати скаргу до наглядового органу із захисту даних. У Польщі це Urząd Ochrony Danych Osobowych (UODO), ul. Stawki 2, 00-193 Warszawa, <a href="https://uodo.gov.pl" className="text-primary hover:underline">uodo.gov.pl</a>. Якщо ви перебуваєте в іншій країні ЄС, ви можете звернутися до наглядового органу у вашій країні.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Обов&apos;язок надати дані</h2>
              <p>Надання реєстраційних даних (ім&apos;я, email) є необхідною умовою для укладення Договору та користування Платформою. Без цих даних ми не зможемо створити Акаунт і надати Послуги.</p>
              <p className="mt-3">Надання платіжних даних необхідне для оплати Підписки. Надання даних для маркетингових комунікацій є добровільним і не впливає на можливість користуватися Платформою.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Безпека даних</h2>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Шифрування даних під час передачі (TLS/SSL) і в стані спокою</li>
                <li>Регулярне резервне копіювання</li>
                <li>Контроль доступу та автентифікація</li>
                <li>Моніторинг безпеки інфраструктури</li>
                <li>Регулярний перегляд та оновлення засобів безпеки</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">11. Автоматизоване ухвалення рішень</h2>
              <p>Платформа використовує ШІ для генерації контенту, що є її основною функцією. Ми не використовуємо автоматизоване ухвалення рішень або профілювання, що мають правові наслідки для вас (ст. 22 GDPR).</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">12. Дані дітей</h2>
              <p>Платформа не призначена для осіб віком до 16 років. Ми свідомо не збираємо дані дітей. Якщо ви дізналися, що дитина надала нам персональні дані, зверніться на <a href="mailto:info@draft2live.ai" className="text-primary hover:underline">info@draft2live.ai</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">13. Зміни до Політики</h2>
              <p>Ми можемо оновлювати цю Політику. Про суттєві зміни ми повідомимо вас електронною поштою або через інтерфейс Платформи. Дата останнього оновлення зазначена вгорі цієї сторінки.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">14. Контакти</h2>
              <div className="p-4 rounded-xl bg-white/5 border border-border">
                <p><strong className="text-white">Aklima Polska sp. z o.o.</strong></p>
                <p className="mt-1">ul. Postępu 15, 02-676 Warszawa, Polska</p>
                <p className="mt-1">Email: <a href="mailto:info@draft2live.ai" className="text-primary hover:underline">info@draft2live.ai</a></p>
                <p className="mt-1">Сайт: <a href="https://draft2live.ai" className="text-primary hover:underline">draft2live.ai</a></p>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
