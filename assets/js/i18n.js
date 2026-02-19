const lngs = {
  en: { nativeName: 'English' },
  fr: { nativeName: 'Français' }
}

const rerender = () => {
  // start localizing, details:
  // https://github.com/i18next/jquery-i18next#usage-of-selector-function
  $('html').localize()

  //$('title').text($.t('head.title'))
  $('meta[name=description]').attr('content', $.t('head.description'))
}

$(function () {

  let storedLng = window.localStorage.getItem("lang");

  let fallbackLng= "en"

  if(storedLng != null){
    fallbackLng = storedLng;
  }

  // use plugins and options as needed, for options, detail see
  // https://www.i18next.com
  i18next
    .use(i18nextHttpBackend)
    .init({
      debug: true,
      fallbackLng: fallbackLng,
      backend: {
      
        loadPath: 'assets/js/i18n/locales/{{lng}}/{{ns}}.json'
      }
    }, (err, t) => {
      if (err) return console.error(err)

      // define the formatter function
      i18next.services.formatter.add('LLLL', (value, lng, options) => {
        return moment(value).locale(lng).format('LLLL')
      })

      // for options see
      // https://github.com/i18next/jquery-i18next#initialize-the-plugin
      jqueryI18next.init(i18next, $, { useOptionsAttr: true })

      // fill language switcher
      Object.keys(lngs).map((lng) => {
        const opt = new Option(lngs[lng].nativeName, lng)
        if (lng === i18next.resolvedLanguage) {
          opt.setAttribute('selected', 'selected')
        }
        $('#languageSwitcher').append(opt)
      })
      let languageChangedCounter = 0
      $('#languageSwitcher').change((a, b, c) => {
        
        const chosenLng = $(this).find('option:selected').attr('value')
        
        
        window.localStorage.setItem("lang", chosenLng);
        window.localStorage.removeItem("fighterDataMap");
           
        location.reload();
        i18next.changeLanguage(chosenLng, () => {
          rerender()

          // language changed message
          languageChangedCounter++
          $('#languageChangedNotification').localize({ count: languageChangedCounter })
          if (languageChangedCounter === 1) {
            $('#languageChangedNotification').show()
          }
        })
      })

      rerender()
    })
})
