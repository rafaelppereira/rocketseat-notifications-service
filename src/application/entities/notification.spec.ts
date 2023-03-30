import { Content } from './content';
import { Notification } from './Notification';

describe('Notification content', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('New solicitation friendship'),
      category: 'social',
      recipientId: 'dbb21ad1-16d1-4865-a814-ef4c87094a7f',
    });

    expect(notification).toBeTruthy();
  });
});
