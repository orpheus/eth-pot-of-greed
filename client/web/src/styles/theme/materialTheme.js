import { createMuiTheme } from '@material-ui/core/styles'
import RobotoRegular from './fonts/Roboto-Regular.ttf'
import theme from './theme'

export default createMuiTheme({
  ...theme,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': {
          fontFamily: 'roboto',
          src: (`url(${RobotoRegular})`)
        }
      }
    }
  }
})
