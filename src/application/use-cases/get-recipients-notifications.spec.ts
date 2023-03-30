import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotification } from './get-recipients-notifications';

describe('Get recipient notification', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '7e8ca853-6adb-4a48-89b4-d1d40bfa6978' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '7e8ca853-6adb-4a48-89b4-d1d40bfa6978' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '7e8ca853-6adb-4a48-89b4-d1d40bfa6978' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: '7e8ca853-6adb-4a48-89b4-d1d40bfa6978',
    });

    expect(notifications).toHaveLength(3);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: '7e8ca853-6adb-4a48-89b4-d1d40bfa6978',
        }),
        expect.objectContaining({
          recipientId: '7e8ca853-6adb-4a48-89b4-d1d40bfa6978',
        }),
        expect.objectContaining({
          recipientId: '7e8ca853-6adb-4a48-89b4-d1d40bfa6978',
        }),
      ]),
    );
  });
});
