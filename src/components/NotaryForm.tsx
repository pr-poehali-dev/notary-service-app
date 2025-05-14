import React, { useState, useEffect } from "react";
import {
  Check,
  Upload,
  Trash2,
  ChevronRight,
  ArrowLeft,
  Send,
  FileText,
} from "lucide-react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import emailjs from "@emailjs/browser";

// Список нотариальных действий
const notarialActions = [
  { id: 1, label: "Удостоверение сделок" },
  {
    id: 2,
    label:
      "Выдача свидетельств о праве собственности на долю в общем имуществе супругов",
  },
  { id: 3, label: "Наложение и снятие запрещения отчуждения имущества" },
  {
    id: 4,
    label: "Свидетельствование верности копий документов и выписок из них",
  },
  { id: 5, label: "Свидетельствование подлинности подписи на документах" },
  {
    id: 6,
    label:
      "Свидетельствование верности перевода документов с одного языка на другой",
  },
  { id: 7, label: "Удостоверение факта нахождения гражданина в живых" },
  {
    id: 8,
    label: "Удостоверение факта нахождения гражданина в определенном месте",
  },
  {
    id: 9,
    label:
      "Удостоверение тождественности гражданина с лицом, изображенным на фотографии",
  },
  { id: 10, label: "Удостоверение времени предъявления документов" },
  {
    id: 11,
    label:
      "Передача заявлений и (или) иных документов физических и юридических лиц другим физическим и юридическим лицам",
  },
  { id: 12, label: "Принятие в депозит денежных сумм и ценных бумаг" },
  { id: 13, label: "Совершение исполнительных надписей" },
  { id: 14, label: "Совершение протестов векселей" },
  {
    id: 15,
    label: "Предъявление чеков к платежу и удостоверение неоплаты чеков",
  },
  { id: 16, label: "Принятие на хранение документов" },
  { id: 17, label: "Совершение морских протестов" },
  { id: 18, label: "Обеспечение доказательств" },
  {
    id: 19,
    label:
      "Удостоверение сведений о лицах в случаях, предусмотренных законодательством РФ",
  },
  { id: 20, label: "Регистрация уведомлений о залоге движимого имущества" },
  {
    id: 21,
    label: "Выдача выписок из реестра уведомлений о залоге движимого имущества",
  },
  {
    id: 22,
    label:
      "Выдача дубликатов нотариальных свидетельств, исполнительных надписей и документов",
  },
  {
    id: 23,
    label:
      "Удостоверение равнозначности электронного документа документу на бумажном носителе",
  },
  {
    id: 24,
    label:
      "Удостоверение равнозначности документа на бумажном носителе электронному документу",
  },
  {
    id: 25,
    label:
      "Удостоверение тождественности собственноручной подписи инвалида по зрению с факсимильным воспроизведением его собственноручной подписи",
  },
  { id: 26, label: "Выдача свидетельства о праве на наследство" },
  { id: 27, label: "Принятие мер по охране наследственного имущества" },
  { id: 28, label: "Удостоверение решений органов юридических лиц" },
  {
    id: 29,
    label:
      "Представление документов на государственную регистрацию юридических лиц и индивидуальных предпринимателей",
  },
  {
    id: 30,
    label:
      "Внесение сведений в реестр списков участников обществ с ограниченной ответственностью ЕИС нотариата",
  },
  {
    id: 31,
    label:
      "Выдача выписок из реестра списков участников обществ с ограниченной ответственностью ЕИС нотариата",
  },
  {
    id: 32,
    label: "Выдача выписок из реестра распоряжений об отмене доверенностей",
  },
  {
    id: 33,
    label:
      "Удостоверение факта возникновения права собственности на объекты недвижимого имущества в силу приобретательной давности",
  },
  {
    id: 34,
    label:
      "Удостоверение равнозначности электронного документа, изготовленного нотариусом в ином формате, электронному документу, представленному нотариусу",
  },
  {
    id: 35,
    label:
      "Совершение нотариальных действий в связи с увеличением уставного капитала общества с ограниченной ответственностью во исполнение договора конвертируемого займа",
  },
  {
    id: 36,
    label:
      "Удостоверение факта наличия сведений в ЕГРН о фамилии, имени, отчестве и дате рождения гражданина",
  },
];

// Типы заявителей
const applicantTypes = [
  { id: "individual", label: "Физическое лицо" },
  { id: "legal", label: "Юридическое лицо" },
  { id: "entrepreneur", label: "Индивидуальный предприниматель" },
  { id: "foreign", label: "Иностранный гражданин" },
];

// Типы документов
const documentTypes = [
  { id: "passport", label: "Паспорт РФ" },
  { id: "foreign_passport", label: "Загранпаспорт" },
  { id: "birth_certificate", label: "Свидетельство о рождении" },
  { id: "military_id", label: "Военный билет" },
];

interface FormData {
  notarialAction: string;
  applicantType: string;
  fullName: string;
  birthDate: string;
  documentType: string;
  documentSeries: string;
  documentNumber: string;
  documentIssuer: string;
  documentCode: string;
  phone: string;
  email: string;
  inn: string;
  kpp: string;
  ogrn: string;
  companyName: string;
  position: string;
  files: File[];
}

interface Step {
  id: string;
  title: string;
  description: string;
}

const NotaryForm: React.FC = () => {
  const steps: Step[] = [
    {
      id: "step1",
      title: "Выбор нотариального действия",
      description:
        "Выберите тип нотариального действия, которое вам необходимо",
    },
    {
      id: "step2",
      title: "Тип заявителя",
      description: "Укажите, кто обращается за нотариальным действием",
    },
    {
      id: "step3",
      title: "Персональные данные",
      description: "Заполните ваши персональные данные",
    },
    {
      id: "step4",
      title: "Документы",
      description: "Прикрепите необходимые документы (при необходимости)",
    },
    {
      id: "step5",
      title: "Подтверждение",
      description: "Проверьте введенные данные и отправьте заявку",
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    notarialAction: "",
    applicantType: "",
    fullName: "",
    birthDate: "",
    documentType: "passport",
    documentSeries: "",
    documentNumber: "",
    documentIssuer: "",
    documentCode: "",
    phone: "",
    email: "",
    inn: "",
    kpp: "",
    ogrn: "",
    companyName: "",
    position: "",
    files: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const savedData = getCookie("notaryFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData((prev) => ({ ...prev, ...parsedData, files: [] }));
      } catch (e) {
        console.error("Error parsing saved form data:", e);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, files: [...prev.files, ...newFiles] }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const dataToSave = { ...formData };
    delete dataToSave.files;
    setCookie("notaryFormData", JSON.stringify(dataToSave), 30);

    const templateParams = {
      notarialAction: formData.notarialAction,
      applicantType: formData.applicantType,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
    };

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        templateParams,
        "YOUR_PUBLIC_KEY",
      )
      .then(() => {
        setSubmitting(false);
        setCompleted(true);
        toast({
          title: "Заявка отправлена",
          description:
            "Ваша заявка успешно отправлена. Ожидайте звонка специалиста",
          variant: "default",
        });
      })
      .catch((error) => {
        setSubmitting(false);
        toast({
          title: "Ошибка отправки",
          description:
            "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.",
          variant: "destructive",
        });
        console.error("Ошибка отправки:", error);
      });
  };

  const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const getCookie = (name: string) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return !!formData.notarialAction;
      case 1:
        return !!formData.applicantType;
      case 2:
        if (
          formData.applicantType === "individual" ||
          formData.applicantType === "foreign"
        ) {
          return (
            !!formData.fullName &&
            !!formData.birthDate &&
            !!formData.documentType &&
            !!formData.documentNumber &&
            !!formData.phone
          );
        } else {
          return (
            !!formData.companyName &&
            !!formData.inn &&
            !!formData.fullName &&
            !!formData.position &&
            !!formData.phone
          );
        }
      case 3:
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (completed) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600">
              <Check className="w-12 h-12 mx-auto mb-2" />
              Заявка успешно отправлена!
            </CardTitle>
            <CardDescription>
              Ваша заявка принята и находится в обработке. Нотариус свяжется с
              вами в ближайшее время по указанному номеру телефона.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              Для вашего удобства мы сохранили ваши данные для будущих
              обращений.
            </p>
            <Button
              onClick={() => {
                setCurrentStep(0);
                setCompleted(false);
              }}
              className="mt-4"
            >
              Создать новую заявку
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-notary-800">
            Запись на приём к нотариусу
          </CardTitle>
          <CardDescription className="text-center">
            Заполните форму для записи на приём
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`step-number ${index < currentStep ? "completed" : index === currentStep ? "current" : ""}`}
                    >
                      {index < currentStep ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="text-xs text-center mt-1 hidden sm:block max-w-[100px]">
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`step-connector mt-4 ${index < currentStep ? "completed" : ""}`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Шаг 1: Выбор нотариального действия */}
            <div
              className={`step-container ${currentStep === 0 ? "active" : ""}`}
            >
              <h3 className="text-lg font-semibold mb-4">
                Выберите нотариальное действие
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Укажите, какой вид нотариального действия вам требуется
              </p>
              <div className="grid gap-4">
                <Select
                  value={formData.notarialAction}
                  onValueChange={(value) =>
                    handleSelectChange("notarialAction", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите нотариальное действие" />
                  </SelectTrigger>
                  <SelectContent>
                    {notarialActions.map((action) => (
                      <SelectItem key={action.id} value={action.label}>
                        {action.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Шаг 2: Тип заявителя */}
            <div
              className={`step-container ${currentStep === 1 ? "active" : ""}`}
            >
              <h3 className="text-lg font-semibold mb-4">
                Выберите тип заявителя
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Укажите, от чьего имени подаётся заявка
              </p>
              <RadioGroup
                value={formData.applicantType}
                onValueChange={(value) =>
                  handleSelectChange("applicantType", value)
                }
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {applicantTypes.map((type) => (
                  <div
                    key={type.id}
                    className="flex items-center space-x-2 border p-4 rounded-md hover:border-primary cursor-pointer"
                  >
                    <RadioGroupItem value={type.id} id={type.id} />
                    <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Шаг 3: Персональные данные */}
            <div
              className={`step-container ${currentStep === 2 ? "active" : ""}`}
            >
              <h3 className="text-lg font-semibold mb-4">
                Персональные данные
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Заполните данные{" "}
                {formData.applicantType === "individual"
                  ? "физического лица"
                  : formData.applicantType === "legal"
                    ? "юридического лица"
                    : formData.applicantType === "entrepreneur"
                      ? "индивидуального предпринимателя"
                      : "иностранного гражданина"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formData.applicantType === "legal" ||
                  formData.applicantType === "entrepreneur") && (
                  <>
                    <div className="md:col-span-2">
                      <Label htmlFor="companyName">
                        Наименование организации
                      </Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="ООО «Название компании»"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="inn">ИНН</Label>
                      <Input
                        id="inn"
                        name="inn"
                        value={formData.inn}
                        onChange={handleInputChange}
                        placeholder="1234567890"
                        className="mt-1"
                      />
                    </div>
                    {formData.applicantType === "legal" && (
                      <div>
                        <Label htmlFor="kpp">КПП</Label>
                        <Input
                          id="kpp"
                          name="kpp"
                          value={formData.kpp}
                          onChange={handleInputChange}
                          placeholder="123456789"
                          className="mt-1"
                        />
                      </div>
                    )}
                    <div>
                      <Label htmlFor="ogrn">
                        ОГРН
                        {formData.applicantType === "entrepreneur" ? "ИП" : ""}
                      </Label>
                      <Input
                        id="ogrn"
                        name="ogrn"
                        value={formData.ogrn}
                        onChange={handleInputChange}
                        placeholder="1234567890123"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Должность представителя</Label>
                      <Input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        placeholder="Генеральный директор"
                        className="mt-1"
                      />
                    </div>
                  </>
                )}
                <div
                  className={`${formData.applicantType === "legal" || formData.applicantType === "entrepreneur" ? "" : "md:col-span-2"}`}
                >
                  ...
                </div>
              </div>
            </div>

            {/* Шаг 4: Загрузка документов */}
            <div
              className={`step-container ${currentStep === 3 ? "active" : ""}`}
            >
              <h3 className="text-lg font-semibold mb-4">Документы</h3>
              <p className="text-sm text-muted-foreground mb-6">
                При необходимости вы можете прикрепить документы. Этот шаг
                необязательный.
              </p>
              <div className="space-y-4">
                <label className="custom-file-upload">
                  <Icon name="Upload" className="h-10 w-10 text-gray-400" />
                  <span className="text-sm font-medium">
                    Перетащите файлы сюда или нажмите для выбора
                  </span>
                  <span className="text-xs text-gray-500">
                    Поддерживаются любые форматы файлов
                  </span>
                  <Input
                    id="files"
                    name="files"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {formData.files.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Загруженные файлы:</h4>
                    <ul className="space-y-2">
                      {formData.files.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                        >
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-notary-700" />
                            <span className="text-sm truncate max-w-[200px] sm:max-w-xs">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              (
                              {file.size / 1024 < 1024
                                ? `${(file.size / 1024).toFixed(1)} Кб`
                                : `${(file.size / 1024 / 1024).toFixed(1)} Мб`}
                              )
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Шаг 5: Подтверждение заявки */}
            <div
              className={`step-container ${currentStep === 4 ? "active" : ""}`}
            >
              <h3 className="text-lg font-semibold mb-4">
                Подтверждение заявки
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Проверьте введённые данные перед отправкой заявки
              </p>
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  ...
                </div>
                {formData.files.length > 0 && (
                  <div className="mt-2">
                    <span className="font-medium block">
                      Приложенные документы:
                    </span>
                    <ul className="list-disc list-inside mt-1">
                      {formData.files.map((file, index) => (
                        <li key={index} className="text-sm text-notary-800">
                          {file.name} (
                          {file.size / 1024 < 1024
                            ? `${(file.size / 1024).toFixed(1)} Кб`
                            : `${(file.size / 1024 / 1024).toFixed(1)} Мб`}
                          )
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Нажимая кнопку «Отправить заявку», вы даёте согласие на
                  обработку персональных данных в соответствии с Федеральным
                  законом №152-ФЗ «О персональных данных».
                </p>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between px-6 py-4 border-t">
          ...
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotaryForm;
