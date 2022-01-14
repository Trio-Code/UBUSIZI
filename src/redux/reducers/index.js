import { combineReducers } from 'redux';

import admin from './admin';
import post from './post';
import user from './user';
import search from './search';
import follow from './follow';
import likes from './likes';
import report from './report';
import comment from './comment';
import category from './category';
import color from './color';
import font from './font';
import poetVerification from './poetVerifivation';
import recent from './recent';
import suggestions from './suggestions';
import notification from './activities';

export default combineReducers({
  ...follow,
  ...admin,
  ...user,
  ...post,
  ...search,
  ...likes,
  ...report,
  ...comment,
  ...category,
  ...color,
  ...font,
  ...poetVerification,
  ...recent,
  ...suggestions,
  ...notification,
});
