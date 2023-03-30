import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count recipient notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '7e8ca853-6adb-4a48-89b4-d1d40bfa6978' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '7e8ca853-6adb-4a48-89b4-d1d40bfa6978' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'f4002b3c-f5d1-43ba-989c-f32eac368d50' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: '7e8ca853-6adb-4a48-89b4-d1d40bfa6978',
    });

    expect(count).toEqual(2);
  });
});
