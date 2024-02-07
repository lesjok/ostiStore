# ostiStore
[![Netlify Status](https://api.netlify.com/api/v1/badges/45b07e86-afd6-4eb8-9226-105c751be5e2/deploy-status)](https://app.netlify.com/sites/ostistore/deploys)
[![CI](https://github.com/lesjok/ostiStore/actions/workflows/ci.yml/badge.svg)](https://github.com/lesjok/ostiStore/actions/workflows/ci.yml)

Проект представляет собой каталог товаров одежды

Deploy: https://ostistore.netlify.app/

API: https://fakestoreapi.com/

## Реализованы следующие требования к функциональности:

### 1 уровень (обязательный - необходимый минимум)

- [x] Реализованы Требования к функциональности
- [x] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используем Firebase [firebase.config](https://github.com/lesjok/ostiStore/blob/main/src/firebase/firebase.config.ts)

#### React

- [x] Пишем функциональные компоненты с хуками в приоритете над классовыми [components](https://github.com/lesjok/ostiStore/tree/main/src/components), [pages](https://github.com/lesjok/ostiStore/tree/main/src/pages)
- [x] Есть разделение на умные ([MainPage](https://github.com/lesjok/ostiStore/blob/main/src/pages/MainPage/MainPage.tsx)) и глупые ([CardItem](https://github.com/lesjok/ostiStore/blob/main/src/components/CardItem/CardItem.tsx)) компоненты
- [x] Есть рендеринг списков [MainPage](https://github.com/lesjok/ostiStore/blob/main/src/pages/MainPage/MainPage.tsx)
- [x] Реализована хотя бы одна форма [LoginPage](https://github.com/lesjok/ostiStore/blob/main/src/pages/LoginPage/LoginPage.tsx)
- [x] Есть применение Контекст API [ThemeContext](https://github.com/lesjok/ostiStore/blob/main/src/contexts/ThemeContext.tsx), [FeatureFlagContext](https://github.com/lesjok/ostiStore/blob/main/src/contexts/FeatureFlagContext.tsx)
- [x] Есть применение предохранителя [ErrorBoundary](https://github.com/lesjok/ostiStore/blob/main/src/components/MyErrorBoundary/MyErrorBoundary.tsx)
- [x] Есть хотя бы один кастомный хук [Debounce](https://github.com/lesjok/ostiStore/blob/main/src/hooks/debounce.tsx)
- [x] Хотя бы несколько компонентов используют PropTypes [CardItem](https://github.com/lesjok/ostiStore/blob/main/src/components/CardItem/CardItem.tsx), [Header](https://github.com/lesjok/ostiStore/blob/main/src/components/Header/Header.tsx)
- [x] Поиск не должен триггерить много запросов к серверу [Search](https://github.com/lesjok/ostiStore/blob/main/src/components/Search/Search.tsx)
- [x] Есть применение lazy ([AppRouter](https://github.com/lesjok/ostiStore/blob/main/src/router/AppRouter.tsx)) + Suspense ([App](https://github.com/lesjok/ostiStore/blob/main/src/App.tsx))

#### Redux

- [x] Используем Modern Redux with Redux Toolkit [Store](https://github.com/lesjok/ostiStore/blob/main/src/redux/store.ts)
- [x] Используем слайсы [Slice](https://github.com/lesjok/ostiStore/blob/main/src/redux/slice.ts)
- [x] Есть хотя бы одна кастомная мидлвара [AuthMiddleware](https://github.com/lesjok/ostiStore/blob/main/src/middlewares/authMiddleware.ts), [ConsoleMiddleware](https://github.com/lesjok/ostiStore/blob/main/src/middlewares/consoleMiddleware.ts)
- [x] Используется RTK Query [api](https://github.com/lesjok/ostiStore/blob/main/src/redux/api.ts)
- [x] Используется Transforming Responses [api](https://github.com/lesjok/ostiStore/blob/main/src/redux/api.ts)

### 2 уровень (необязательный)

- [x] Используeтся TypeScript [types](https://github.com/lesjok/ostiStore/blob/main/src/types/type.ts)
- [x] Подключен storybook и созданы два, три сториса с knobs, которые показывают разные состояния компонента [Spinner](https://github.com/lesjok/ostiStore/blob/main/src/components/Spinner/Spinner.stories.tsx), [CustomLink](https://github.com/lesjok/ostiStore/blob/main/src/ui/CustomLink.stories.tsx)
- [x] Используется Firebase для учетных записей пользователей и их Избранного и Истории поиска [firebase.config](https://github.com/lesjok/ostiStore/blob/main/src/firebase/firebase.config.ts)
- [x] Настроен [CI](https://github.com/lesjok/ostiStore/blob/.github/workflows/ci.yml) / [CD](https://github.com/lesjok/ostiStore/blob/main/.github/workflows/cd.yml)
- [x] Реализована виртуализация списков [HistoryPage](https://github.com/lesjok/ostiStore/blob/main/src/pages/HistoryPage/HistoryPage.tsx)
- [x] Проведена оптимизация приложения [ThemeContext](https://github.com/lesjok/ostiStore/blob/main/src/contexts/ThemeContext.tsx), [FeatureFlagContext](https://github.com/lesjok/ostiStore/blob/main/src/contexts/FeatureFlagContext.tsx). Обернула value в useMemo. До этого value создавался заново при каждом рендере компонента, теперь значение value будет пересчитано только при изменении зависимостей.
- [x] Реализована фича “Поделиться в телеграм”, закрытую под фича флагом [FeatureFlagApi](https://github.com/lesjok/ostiStore/blob/main/src/features/FeatureFlagApi.ts)
- [x] Добавлен тест Playwright [guest.test](https://github.com/lesjok/ostiStore/blob/main/tests/guest.test.ts)
- [x] Связь UI и бизнес-логики построена не через команды, а через события [actions](https://github.com/lesjok/ostiStore/blob/main/src/redux/actions.ts)
- [x] Project Console API [console](https://github.com/lesjok/ostiStore/blob/main/src/consoleAPI/console.ts)
