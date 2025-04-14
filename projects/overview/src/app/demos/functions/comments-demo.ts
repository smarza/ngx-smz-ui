import { DemoKeys } from '../../demos/demo-keys';
import { SmzCommentsBuilder } from 'ngx-smz-ui';

export const CommentsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.COMMENTS_SECTION]: () => {
    return new SmzCommentsBuilder('8ce2a2db-77d4-4ef6-87cf-c7a5eee65085')
      .build()
  },
}