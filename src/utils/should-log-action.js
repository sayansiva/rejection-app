import { complement, flip, includes } from 'ramda';

const shouldLogAction = complement(flip(includes));

export default shouldLogAction;
