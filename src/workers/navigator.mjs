import * as formatters from './utils/formatter.mjs'
import * as roll20 from './utils/roll20.mjs'

export const Navigator = {
  addTabListeners(tabs) {
    tabs.forEach((tab) => {
      roll20.addEventListener(`clicked:navigation_${tab}`, () => {
        console.log('Clicked on ', tab)

        roll20.setAttributes({
          navigation_tab: tab,
        })
      })
    })
  },
  addErrorListeners() {
    roll20.addEventListener('clicked:close_error', () => {
      roll20.setAttributes(
        {
          error_message: '',
          show_error: formatters.boolean.format(false),
        },
        {
          silent: true,
        }
      )
    })
  },
  showError(message) {
    roll20.setAttributes(
      {
        error_message: message,
        show_error: formatters.boolean.format(true),
      },
      {
        silent: true,
      }
    )
  },
}
