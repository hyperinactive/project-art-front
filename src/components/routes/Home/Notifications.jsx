/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Feed, Icon, Image } from 'semantic-ui-react';
import {
  example1,
  example2,
  example3,
  example4,
  defaultAvatar,
} from '../../../appConfig';

// TODO:
// this is just a placeholder
const Notifications = () => (
  <Feed>
    <Feed.Event>
      <Feed.Label>
        <img src={example3} />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>Elliot Fu</Feed.User> of <Feed.User>FeedBot</Feed.User>{' '}
          added you as a friend
          <Feed.Date>1 Hour Ago</Feed.Date>
        </Feed.Summary>
        <Feed.Meta />
      </Feed.Content>
    </Feed.Event>

    <Feed.Event>
      <Feed.Label image={example4} />
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>Helen Troy</Feed.User> of <Feed.User>Snorlax</Feed.User>{' '}
          added <span>2 new illustrations</span>
          <Feed.Date>8 hours ago</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <span>
            {/* <img src={example1} style={{ width: '200px' }} /> */}
            <Image src={example1} size="massive" />
          </span>
          <span>
            {/* <img src={example2} style={{ width: '200px' }} /> */}
            <Image src={example2} size="massive" />
          </span>
        </Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name="like" />
            29 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>

    {/* SHORTHAND */}
    <Feed.Event>
      <Feed.Label image={defaultAvatar} />
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>Jenny Hess</Feed.User> accepted you into their project!{' '}
          <Feed.User>Snorlax</Feed.User>
          <Feed.Date>1 Day Ago</Feed.Date>
        </Feed.Summary>
        <Feed.Meta />
      </Feed.Content>
    </Feed.Event>
  </Feed>
);

export default Notifications;
