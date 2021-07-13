import React, { useContext, useEffect } from 'react';
import { Item } from 'semantic-ui-react';
import { backgroundGradient } from '../../appConfig';
import { NavigationContext } from '../../context/navigationContext/NavigationProvider';

const Help = () => {
  const { setActiveItem, setTemporaryTab } = useContext(NavigationContext);

  useEffect(() => {
    setTemporaryTab({
      name: 'Help',
      link: '/help',
    });
    setActiveItem('help');
  }, []);

  return (
    <div className="help">
      <Item.Group className="help__itemGroup">
        <Item>
          <Item.Image size="small" src={backgroundGradient} />
          <Item.Content>
            <Item.Header as="a" className="accent">
              General
            </Item.Header>
            <Item.Meta className="text">Random FAQ</Item.Meta>
            <Item.Description className="text">
              Idk dude. This is just a placeholder for now. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Nihil ex praesentium id
              delectus voluptatem voluptates laudantium soluta rem quia placeat,
              iste, maiores ut laborum nisi commodi quaerat? Ullam, quaerat
              autem?
            </Item.Description>
            <Item.Extra as="a" className="help__additional">
              Additional Details
            </Item.Extra>
          </Item.Content>
        </Item>

        <Item>
          <Item.Image size="small" src={backgroundGradient} />
          <Item.Content>
            <Item.Header as="a" className="accent">
              Community
            </Item.Header>
            <Item.Meta className="text">Random FAQ</Item.Meta>
            <Item.Description className="text">
              Idk dude. This is just a placeholder for now. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Nihil ex praesentium id
              delectus voluptatem voluptates laudantium soluta rem quia placeat,
              iste, maiores ut laborum nisi commodi quaerat? Ullam, quaerat
              autem?
            </Item.Description>
            <Item.Extra as="a" className="help__additional">
              Additional Details
            </Item.Extra>
          </Item.Content>
        </Item>

        <Item>
          <Item.Image size="small" src={backgroundGradient} />
          <Item.Content>
            <Item.Header as="a" className="accent">
              Support
            </Item.Header>
            <Item.Meta className="text">Random FAQ</Item.Meta>
            <Item.Description className="text">
              Idk dude. This is just a placeholder for now. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Nihil ex praesentium id
              delectus voluptatem voluptates laudantium soluta rem quia placeat,
              iste, maiores ut laborum nisi commodi quaerat? Ullam, quaerat
              autem?
            </Item.Description>
            <Item.Extra as="a" className="help__additional">
              Additional Details
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  );
};

export default Help;
