
import React from 'react';
import NotaryForm from '@/components/NotaryForm';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Scale" className="h-8 w-8 text-notary-700" />
            <h1 className="text-xl font-montserrat font-bold text-notary-800">НотариусОнлайн</h1>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <a href="#" className="text-sm text-notary-700 hover:text-notary-900 px-3 py-2 rounded-md">О нас</a>
            <a href="#" className="text-sm text-notary-700 hover:text-notary-900 px-3 py-2 rounded-md">Услуги</a>
            <a href="#" className="text-sm text-notary-700 hover:text-notary-900 px-3 py-2 rounded-md">Контакты</a>
          </div>
        </div>
      </header>

      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-notary-900 mb-4">
              Запись на приём к нотариусу
            </h1>
            <p className="text-lg text-notary-600">
              Заполните форму ниже, чтобы оставить заявку на нотариальное действие.
              Наш специалист свяжется с вами в ближайшее время.
            </p>
          </div>

          <NotaryForm />

          <div className="mt-16 max-w-4xl mx-auto">
            <Separator className="mb-10" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-notary-100 p-4 mb-4">
                  <Icon name="ClipboardCheck" className="h-8 w-8 text-notary-700" />
                </div>
                <h3 className="text-lg font-montserrat font-semibold mb-2">Удобная запись</h3>
                <p className="text-sm text-gray-600">
                  Заполните форму и выберите удобное для вас время посещения нотариальной конторы
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-notary-100 p-4 mb-4">
                  <Icon name="Shield" className="h-8 w-8 text-notary-700" />
                </div>
                <h3 className="text-lg font-montserrat font-semibold mb-2">Защита данных</h3>
                <p className="text-sm text-gray-600">
                  Ваши персональные данные надежно защищены в соответствии с законодательством РФ
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-notary-100 p-4 mb-4">
                  <Icon name="Clock" className="h-8 w-8 text-notary-700" />
                </div>
                <h3 className="text-lg font-montserrat font-semibold mb-2">Экономия времени</h3>
                <p className="text-sm text-gray-600">
                  Предварительная запись и консультация позволят сэкономить ваше время при посещении
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-notary-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-montserrat font-semibold mb-4">НотариусОнлайн</h3>
              <p className="text-sm text-gray-300 mb-4">
                Онлайн-запись на прием к нотариусу в вашем городе. Все виды нотариальных действий.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-montserrat font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" className="h-4 w-4" />
                  г. Москва, ул. Нотариальная, д. 1
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" className="h-4 w-4" />
                  +7 (999) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" className="h-4 w-4" />
                  info@notaryonline.ru
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-montserrat font-semibold mb-4">Часы работы</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li className="flex justify-between">
                  <span>Понедельник - Пятница:</span>
                  <span>9:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Суббота:</span>
                  <span>10:00 - 15:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Воскресенье:</span>
                  <span>Выходной</span>
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-6 bg-gray-700" />
          
          <div className="text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} НотариусОнлайн. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
