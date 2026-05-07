import Navigation from '@/components/Navigation';
import Footer from '@/components/sections/Footer';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Політика cookies | Draft2Live',
  description: 'Політика cookies Draft2Live: типи cookies, правові підстави, керування згодою та контактна інформація.',
};

export default function CookiesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/" className="text-primary text-sm hover:underline mb-8 inline-block">&larr; На головну</Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Політика cookies</h1>
          <p className="text-text-muted text-sm mb-12">Останнє оновлення: 10 квітня 2026</p>

          <div className="prose-legal space-y-8 text-text-secondary text-[15px] leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Що таке cookies</h2>
              <p>Cookies — це невеликі текстові файли, які зберігаються на вашому пристрої (комп&apos;ютері, планшеті, смартфоні), коли ви відвідуєте вебсайти. Вони допомагають сайту запам&apos;ятовувати ваші вподобання та покращувати роботу сервісу.</p>
              <p>Окрім cookies, ми можемо використовувати подібні технології: піксельні теги, локальне сховище (localStorage) та ідентифікатори сесії.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Типи cookies, які ми використовуємо</h2>

              <h3 className="text-white font-medium mt-4 mb-2">Необхідні cookies (завжди активні)</h3>
              <p>Забезпечують базовий функціонал сайту. Без них Платформа не може працювати коректно. Ці cookies неможливо вимкнути.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse my-4 text-left">
                  <thead>
                    <tr>
                      <th className="p-2 border border-border font-semibold text-white">Cookie</th>
                      <th className="p-2 border border-border font-semibold text-white">Постачальник</th>
                      <th className="p-2 border border-border font-semibold text-white">Призначення</th>
                      <th className="p-2 border border-border font-semibold text-white">Тривалість</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-border">session_id</td>
                      <td className="p-2 border border-border">Draft2Live</td>
                      <td className="p-2 border border-border">Ідентифікація сесії користувача</td>
                      <td className="p-2 border border-border">Сесія</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-border">csrf_token</td>
                      <td className="p-2 border border-border">Draft2Live</td>
                      <td className="p-2 border border-border">Захист від CSRF-атак</td>
                      <td className="p-2 border border-border">Сесія</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-border">auth_token</td>
                      <td className="p-2 border border-border">Draft2Live</td>
                      <td className="p-2 border border-border">Автентифікація користувача</td>
                      <td className="p-2 border border-border">30 днів</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-border">cookie_consent</td>
                      <td className="p-2 border border-border">Draft2Live</td>
                      <td className="p-2 border border-border">Збереження налаштувань cookies</td>
                      <td className="p-2 border border-border">6 місяців</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-white font-medium mt-4 mb-2">Аналітичні cookies (потребують згоди)</h3>
              <p>Допомагають нам зрозуміти, як відвідувачі взаємодіють із Платформою, щоб ми могли покращувати її роботу та зручність.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse my-4 text-left">
                  <thead>
                    <tr>
                      <th className="p-2 border border-border font-semibold text-white">Cookie</th>
                      <th className="p-2 border border-border font-semibold text-white">Постачальник</th>
                      <th className="p-2 border border-border font-semibold text-white">Призначення</th>
                      <th className="p-2 border border-border font-semibold text-white">Тривалість</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-border">_ga</td>
                      <td className="p-2 border border-border">Google</td>
                      <td className="p-2 border border-border">Ідентифікація унікальних відвідувачів</td>
                      <td className="p-2 border border-border">13 місяців</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-border">_ga_*</td>
                      <td className="p-2 border border-border">Google</td>
                      <td className="p-2 border border-border">Google Analytics 4 &mdash; стан сесії</td>
                      <td className="p-2 border border-border">13 місяців</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-border">_gid</td>
                      <td className="p-2 border border-border">Google</td>
                      <td className="p-2 border border-border">Ідентифікація відвідувача в межах доби</td>
                      <td className="p-2 border border-border">24 години</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-white font-medium mt-4 mb-2">Маркетингові cookies (потребують згоди)</h3>
              <p>Використовуються для показу релевантної реклами та вимірювання ефективності рекламних кампаній.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse my-4 text-left">
                  <thead>
                    <tr>
                      <th className="p-2 border border-border font-semibold text-white">Cookie</th>
                      <th className="p-2 border border-border font-semibold text-white">Постачальник</th>
                      <th className="p-2 border border-border font-semibold text-white">Призначення</th>
                      <th className="p-2 border border-border font-semibold text-white">Тривалість</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-border">_fbp</td>
                      <td className="p-2 border border-border">Meta</td>
                      <td className="p-2 border border-border">Відстеження конверсій</td>
                      <td className="p-2 border border-border">3 місяці</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-border">_gcl_au</td>
                      <td className="p-2 border border-border">Google</td>
                      <td className="p-2 border border-border">Google Ads &mdash; відстеження конверсій</td>
                      <td className="p-2 border border-border">3 місяці</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-border">li_sugr</td>
                      <td className="p-2 border border-border">LinkedIn</td>
                      <td className="p-2 border border-border">Insight Tag &mdash; рекламна аналітика</td>
                      <td className="p-2 border border-border">3 місяці</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Правова підстава</h2>
              <p>Відповідно до ePrivacy Directive (2002/58/EC) та GDPR:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong className="text-white">Необхідні cookies</strong> встановлюються без згоди, оскільки вони потрібні для функціонування Платформи (ст. 6(1)(f) GDPR)</li>
                <li><strong className="text-white">Аналітичні та маркетингові cookies</strong> встановлюються лише після отримання вашої явної згоди (ст. 6(1)(a) GDPR)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Керування cookies</h2>

              <h3 className="text-white font-medium mt-4 mb-2">4.1. Банер згоди</h3>
              <p>Під час першого відвідування Платформи вам показується банер із запитом згоди. Ви можете прийняти всі cookies, відхилити неосновні або налаштувати категорії вручну. <strong className="text-white">Відмовитися від cookies так само просто, як і прийняти їх.</strong> Ви можете змінити свій вибір будь-коли в налаштуваннях Платформи.</p>
              <p><strong className="text-white">Наслідки відмови:</strong> відмова від аналітичних і маркетингових cookies не впливає на функціонал Платформи. Ви зможете користуватися всіма Послугами. Однак ми не зможемо персоналізувати ваш досвід або показувати релевантну рекламу.</p>

              <h3 className="text-white font-medium mt-4 mb-2">4.2. Налаштування браузера</h3>
              <p>Ви можете налаштувати свій браузер так, щоб блокувати або видаляти cookies. Зверніть увагу, що блокування необхідних cookies може вплинути на роботу Платформи.</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong className="text-white">Chrome:</strong> Налаштування &rarr; Конфіденційність і безпека &rarr; Cookies</li>
                <li><strong className="text-white">Firefox:</strong> Налаштування &rarr; Приватність і безпека &rarr; Cookies</li>
                <li><strong className="text-white">Safari:</strong> Налаштування &rarr; Конфіденційність &rarr; Cookies</li>
                <li><strong className="text-white">Edge:</strong> Налаштування &rarr; Конфіденційність &rarr; Cookies</li>
              </ul>

              <h3 className="text-white font-medium mt-4 mb-2">4.3. Відмова від аналітики</h3>
              <p>Щоб відмовитися від Google Analytics, ви можете встановити офіційне розширення браузера: Google Analytics Opt-out Browser Add-on.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Передача даних</h2>
              <p>Деякі cookies встановлюються сторонними сервісами, чиї сервери розташовані за межами ЄЕЗ. У таких випадках ми забезпечуємо належний рівень захисту даних відповідно до GDPR (детальніше — у <Link href="/privacy" className="text-primary hover:underline">Політиці конфіденційності</Link>, розділ 6).</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Зміни до Політики</h2>
              <p>Тривалість дії cookies не перевищує 13 місяців відповідно до рекомендацій EDPB. Після закінчення цього терміну згода буде запитана повторно.</p>
              <p>Ми можемо оновлювати цю Політику cookies у разі зміни типів або цілей використовуваних cookies. Про суттєві зміни ми повідомимо вас через банер згоди або інтерфейс Платформи.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Контакти</h2>
              <p><strong className="text-white">Aklima Polska sp. z o.o.</strong></p>
              <p>Email: <a href="mailto:info@draft2live.ai" className="text-primary hover:underline">info@draft2live.ai</a></p>
              <p>Сайт: <a href="https://draft2live.ai" className="text-primary hover:underline">draft2live.ai</a></p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
