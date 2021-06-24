import { Home } from 'features/home/home-container';
import { withAuth } from 'hocs/with-auth';
import { withLoading } from 'hocs/with-loading';
import compose from 'ramda/src/compose';

export default compose(withLoading, withAuth)(Home);
