// src/testing/ionic-mocks.ts
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';

export function provideIonicOverlayMocks() {
  const modalEl = {
    present: jasmine.createSpy().and.resolveTo(),
    dismiss: jasmine.createSpy().and.resolveTo(),
    onWillDismiss: jasmine.createSpy().and.resolveTo({ data: null, role: 'cancel' }),
    onDidDismiss: jasmine.createSpy().and.resolveTo({ data: null, role: 'cancel' }),
  };
  const modalCtrl = jasmine.createSpyObj<ModalController>('ModalController', ['create', 'dismiss', 'getTop']);
  modalCtrl.create.and.resolveTo(modalEl as any);
  modalCtrl.dismiss.and.resolveTo(true as any);
  modalCtrl.getTop.and.resolveTo(null as any);

  const sheetEl = {
    present: jasmine.createSpy().and.resolveTo(),
    dismiss: jasmine.createSpy().and.resolveTo(),
    onDidDismiss: jasmine.createSpy().and.resolveTo({ data: null, role: 'cancel' }),
  };
  const actionSheetCtrl = jasmine.createSpyObj<ActionSheetController>('ActionSheetController', ['create', 'dismiss', 'getTop']);
  actionSheetCtrl.create.and.resolveTo(sheetEl as any);
  actionSheetCtrl.dismiss.and.resolveTo(true as any);
  actionSheetCtrl.getTop.and.resolveTo(null as any);

  const alertEl = {
    present: jasmine.createSpy().and.resolveTo(),
    dismiss: jasmine.createSpy().and.resolveTo(),
    onDidDismiss: jasmine.createSpy().and.resolveTo({ data: null, role: 'cancel' }),
  };
  const alertCtrl = jasmine.createSpyObj<AlertController>('AlertController', ['create', 'dismiss', 'getTop']);
  alertCtrl.create.and.resolveTo(alertEl as any);
  alertCtrl.dismiss.and.resolveTo(true as any);
  alertCtrl.getTop.and.resolveTo(null as any);

  return [
    { provide: ModalController, useValue: modalCtrl },
    { provide: ActionSheetController, useValue: actionSheetCtrl },
    { provide: AlertController, useValue: alertCtrl },
  ];
}
