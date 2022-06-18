import { AppBar, Button, Toolbar, Typography } from '@mui/material';

import { LangType } from '../../types';

type TitleBarPropType = {
  lang: LangType;
  setLang: (arg0: LangType) => void;
};

const TitleBar = ({lang, setLang}: TitleBarPropType) => (
  <AppBar position="sticky" sx={{backgroundColor: '#009688'}}>
    <Toolbar>
      <Typography component="h1" variant="h5">
        Linja
      </Typography>
      <Typography component="div" sx={{ flexGrow: 1 }}></Typography>
      <Button
        sx={{ color: 'white', fontWeight: lang === 'en' ? 'bold' : ''}}
        onClick={()=>{
          setLang('en');
        }}
      >
        EN
      </Button>
      |
      <Button
        sx={{ color: 'white', fontWeight: lang === 'fi' ? 'bold' : ''}}
        onClick={()=>{
          setLang('fi');
        }}
      >
        FI
      </Button>
    </Toolbar>
  </AppBar>
);

export default TitleBar;
