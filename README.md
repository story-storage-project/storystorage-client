# Story Storage

<a href="https://www.storystorage.me/" target="_blank">
  <img width="400" alt="image" src="https://github.com/story-storage-project/storystorage-client/assets/84281505/885e5987-6a50-4224-b3b3-ed132fa5485c">
</a>

[Story Storage](https://www.storystorage.me/)는 코드 에디터를 이용해 바로 html 엘리먼트와 스타일을 저장할 수 있는 UI Element 저장소입니다. 매번 새로 만들 필요없이 저장해놓은 엘리먼트를 바로 코드를 복사해 사용할 수 있습니다.

<br />

## Table of contents

- [Objectives](https://github.com/story-storage-project/storystorage-client#objectives)
- [Build](https://github.com/story-storage-project/storystorage-client#build)
- [Service Demo](https://github.com/story-storage-project/storystorage-client#service-demo)
- [Challenges](https://github.com/story-storage-project/storystorage-client#challenges)
  - [코드 에디터 제작](https://github.com/story-storage-project/storystorage-client#%EC%BD%94%EB%93%9C-%EC%97%90%EB%94%94%ED%84%B0-%EC%A0%9C%EC%9E%91)
    - [코드 하이라이트 기능 제작하기](https://github.com/story-storage-project/storystorage-client#%EC%BD%94%EB%93%9C-%ED%95%98%EC%9D%B4%EB%9D%BC%EC%9D%B4%ED%8A%B8-%EA%B8%B0%EB%8A%A5)
    - [Tab 클릭 시 2칸 들여쓰기 되는 기능 추가](https://github.com/story-storage-project/storystorage-client#tab-%ED%81%B4%EB%A6%AD-%EC%8B%9C-2%EC%B9%B8-%EB%93%A4%EC%97%AC%EC%93%B0%EA%B8%B0-%EB%90%98%EB%8A%94-%EA%B8%B0%EB%8A%A5-%EC%B6%94%EA%B0%80)
  - [JSX Parser 제작](https://github.com/story-storage-project/storystorage-client#jsx-parser-%EC%A0%9C%EC%9E%91)
  - [문자열을 CSS로 parsing하기](https://github.com/story-storage-project/storystorage-client#%EB%AC%B8%EC%9E%90%EC%97%B4%EC%9D%84-css%EB%A1%9C-parsing%ED%95%98%EA%B8%B0)
    - [React의 inline style로 적용해보기](https://github.com/story-storage-project/storystorage-client#react%EC%9D%98-inline-style%EB%A1%9C-%EC%A0%81%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0)
    - [CSSOM에 접근해 style 적용하기](https://github.com/story-storage-project/storystorage-client#cssom%EC%97%90-%EC%A0%91%EA%B7%BC%ED%95%B4-style-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
  - [Atomic Design 적용](https://github.com/story-storage-project/storystorage-client#atomic-design-%EC%A0%81%EC%9A%A9)
    - [Styled Component와 함께 적용하기](https://github.com/story-storage-project/storystorage-client#styled-component%EC%99%80-%ED%95%A8%EA%BB%98-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
    - [컴포넌트 구조 설계하기](https://github.com/story-storage-project/storystorage-client#%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B5%AC%EC%A1%B0-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0)
    - [아토믹 디자인 적용 후 느낀 점](https://github.com/story-storage-project/storystorage-client#%EC%95%84%ED%86%A0%EB%AF%B9-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%A0%81%EC%9A%A9-%ED%9B%84-%EB%8A%90%EB%82%80-%EC%A0%90)
  - [반응형 제작](https://github.com/story-storage-project/storystorage-client#%EB%B0%98%EC%9D%91%ED%98%95-%EC%A0%9C%EC%9E%91)
    - [스토리북을 활용한 반응형 제작](https://github.com/story-storage-project/storystorage-client#%EC%8A%A4%ED%86%A0%EB%A6%AC%EB%B6%81%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%B0%98%EC%9D%91%ED%98%95-%EC%A0%9C%EC%9E%91)
    - [반응형 도입 이후 코드 에디터의 크기 문제](https://github.com/story-storage-project/storystorage-client#%EB%B0%98%EC%9D%91%ED%98%95-%EB%8F%84%EC%9E%85-%EC%9D%B4%ED%9B%84-%EC%BD%94%EB%93%9C-%EC%97%90%EB%94%94%ED%84%B0%EC%9D%98-%ED%81%AC%EA%B8%B0-%EB%AC%B8%EC%A0%9C)
  - [Unit Test](https://github.com/story-storage-project/storystorage-client#unit-test)
    - [Test Util 제작하기](https://github.com/story-storage-project/storystorage-client#test-util-%EC%A0%9C%EC%9E%91%ED%95%98%EA%B8%B0)
    - [recoil을 사용하는 컴포넌트 테스트하기](https://github.com/story-storage-project/storystorage-client#recoil%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8%ED%95%98%EA%B8%B0)
    - [테스트를 작성하고 나서의 고찰](https://github.com/story-storage-project/storystorage-client#%ED%85%8C%EC%8A%A4%ED%8A%B8%EB%A5%BC-%EC%9E%91%EC%84%B1%ED%95%98%EA%B3%A0-%EB%82%98%EC%84%9C%EC%9D%98-%EA%B3%A0%EC%B0%B0)
- [Framework](https://github.com/story-storage-project/storystorage-client#framework)
- [Installation](https://github.com/story-storage-project/storystorage-client#installation)
- [Schedule](https://github.com/story-storage-project/storystorage-client#schedule)
- [Creator](https://github.com/story-storage-project/storystorage-client#creator)

<br />

# Objectives

이전 프로젝트에서 라이브러리 없이 기능을 구현해보니 더 많은 배움과 새로운 시각을 얻을 수 있었다는 걸 깨달았습니다. 좀 더 배움의 시간을 가지기 위해 외부 라이브러리 없이 직접 구현하는 것을 이번 프로젝트의 목표로 설정했습니다.

<br />

# Build

- Client: netlify
- Server: aws beanstalk
- Url: https://www.storystorage.me/

<br />

# Service Demo

<p align="center">
  <img width="800" alt="preview01" src="https://github.com/story-storage-project/storystorage-client/assets/84281505/a8313c6e-7e82-4458-8f64-795bf31cffe5">
</p>

<br />

<details>
  <summary>반응형, theme 확인하기</summary>
  <p align="center">
    <img width="800" alt="preview01" src="https://github.com/story-storage-project/storystorage-client/assets/84281505/298e40e6-3269-4257-bfb4-0801b0e6da0e">
  </p>

  <p align="center">
    <img width="800" alt="preview01" src="https://github.com/story-storage-project/storystorage-client/assets/84281505/473734fa-d3cd-4a2d-8a11-9b45a67ca833">
  </p>
</details>

<br />

# Challenges

## 코드 에디터 제작

엘리먼트를 등록하기 위해서는 html, css 코드 에디터가 필요했습니다. 쉽게 코드 미러 라이브러리를 적용할 수도 있지만, javascript처럼 특별한 연산이 필요한 에디터가 아니라는 생각에 직접 만들어보게 되었습니다. 제가 만든 코드 에디터의 기능으로는 간단하게 다음과 같습니다.

- 태그별로 색상이 달라지는 하이라이트 기능
- tab을 클릭하면 2칸이 이동되는 기능
- 브라켓 자동 닫힘 기능
  - html 태그를 입력하면 자동으로 닫힘 태그가 생성되고 caret(커서)의 위치가 태그 중간으로 위치가 변경됩니다.
  - css의 경우 중괄호가 자동으로 닫히는 기능이 있습니다.

<br />

### 코드 하이라이트 기능 제작하기

코드 하이라이트는 코드 에디터 내에 코드마다 색상을 다르게 줄 수 있는 기능입니다.

코드 에디터에서 쓰일 `textarea` 태그는 inline-block 속성으로 태그 내에 다른 태그를 넣을 수 없습니다. 하지만 코드의 종류에 따라 색상을 적용하는 하이라이트를 적용하려면 스타일링이 다른 여러 개의 태그를 넣어야만 합니다. 이 기능을 어떻게 제작해야 하나 고민하다 div 태그를 이용해 에디터를 제작하는 방향으로 진행했습니다.

div 태그의 `contenteditable` 속성을 추가하면 textarea처럼 타이핑이 가능해집니다. 하지만 textarea와는 다른 점이 많았습니다.

1. textarea는 클릭하면 바로 caret이 생성되지만 div 태그는 보이지 않고 타이핑 해야만 caret이 보입니다.
2. div에는 onChange 이벤트가 존재하지 않아, onInput 이벤트를 사용해야 합니다.
   1. textarea처럼 value가 없어 비제어 컴포넌트 방식으로 관리해야 합니다.
3. div에 값을 재할당하는 경우 caret이 맨 앞으로 위치하는 문제가 있습니다.

결국 text의 입력은 textarea가 담당하고, 출력은 div가 담당하게 하도록 하는 방식으로 2가지 태그를 한 번에 써보자 라는 결정을 하게 됐습니다. 이렇게 함으로써 에디터를 제어 컴포넌트 방식으로 관리할 수 있게 되었습니다.

<p align="center">
  <img src="https://github.com/story-storage-project/storystorage-client/assets/84281505/f983a1b4-2fe2-49ff-a040-72aec53e26b2" alt="textarea" />
</p>

text 입력값을 받아들이는 setState와 text에 따른 스타일링된 태그들이 담긴 ref 데이터를 return하는 `useHtmlHighLightQueryText` 라는 커스텀 훅을 만들었습니다. text 입력값이 들어올 때 마다 text를 주석, 공백, 괄호 등으로 `split` 을 적용해 배열로 만든 후 각각의 text에 맞는 스타일링된 태그들을 반환합니다.

<br />

타이핑 되자마자 하이라이트가 적용되어야 하기 때문에 debounce나 throttle을 적용하지 못했습니다. 대신 useCallback을 사용해 타이핑 될 때마다 실행되는 `useHtmlHighLightQueryText`훅 내의 스타일링된 태그를 생성하는 함수가 매번 생성되지 않도록 설정했습니다.

<br />

### Tab 클릭 시 2칸 들여쓰기 되는 기능 추가

기본적으로 `textarea`에서 tab을 클릭하게 되면 focus가 해당 textarea를 벗어나 다른 요소로 이동하게 됩니다. 보통의 코드 에디터는 tab을 누르면 2칸의 공백이 생기게 되는 것이 일반적이라 생각하여 Tab 기능을 추가하게 됐습니다.

tab의 기능을 위해 `insertTab`이라는 util 함수를 제작해 사용했습니다.

```js
export function insertTab(event, textBox, caretPositionArg) {
  event.preventDefault();
  const caretPosition = getCaretPosition(textBox, caretPositionArg);
  const preText = textBox.value.substring(0, caretPosition);
  const postText = textBox.value.substring(caretPosition, textBox.value.length);
  const copyTextBox = textBox;
  copyTextBox.value = `${preText}\t${postText}`;

  return copyTextBox.value;
}
```

`insertTab`의 기능으로는 아래와 같습니다.

1. “tab” keyDown 이벤트가 발생했을 때 `e.preventDefault()`를 이용해 포커스가 이동되지 않도록 합니다.
2. 현재의 caret 위치를 구합니다.
3. 처음부터 현재의 caret 위치까지의 text를 저장합니다.
4. 현재 caret위치부터 끝까지의 text를 저장합니다.
5. 3번과 4번을 더하고, 사이에 `\t`을 추가하여 textarea의 text를 업데이트합니다.

모든 문자열을 반환해 업데이트 하는 작업이 이뤄지기 때문에, caret은 그 즉시 위치 값이 없어지게 됩니다. text를 업데이트하기 전 caret의 위치 값을 저장하고, 업데이트 후에 caret의 위치까지 올바른 위치로 가게 해주는 작업도 해주었습니다.

<br />

## JSX Parser 제작

프로젝트의 구현을 React로 선택했기 때문에 코드에디터로 받은 string을 JSX 엘리먼트로 parsing하는 작업은 필수였습니다.

처음의 계획은 HTML을 거치지 않고 string에서 JSX 태그로 바로 변환하는 방법을 생각했습니다. `innerHTML`의 react 버전인 `dangerouslySetInnerHTML`을 이용하면 바로 변환할 수 있기 때문입니다. 하지만 사용하고 나서 문제점을 발견하게 되었습니다.

```js
<div>
  <textarea value="test" />
  <button>bye</button>
</div>
```

위와 같은 상황에서 `button`이 `textarea`의 value 자체로 인식되는 등 싱글 태그가 적용되지 않는 문제가 생겼습니다. 그리고 React에서도 사용을 지양하길 바라는 마음이 느껴지는 태그 이름이라는 점도 한몫했습니다. JSX로 parsing하기 전 string 코드의 validation 과정을 거치기 때문에 XSS의 위험 요소를 감소시킨 상황이긴 했지만요. 그래서 저는 직접 JSX 엘리먼트를 만들 수 있는 JSX parser를 제작하게 되었습니다.

JSX로 작성된 코드는 Babel을 통해 브라우저에서 실행할 수 있도록 Javascript 코드인 `React.createElement`로 변환됩니다. `React.createElement`의 구조는 다음과 같습니다. 인자로 요소 타입, props, children을 받습니다.

```js
//react
const element = (
  <div className: 'greeting'>
    Parent Element
    <span>Child Element</span>
  </div>
);

// pure javascript
const element = React.createElement(
  'div',
  {className: 'greeting'},
  React.createElement('span', null, 'Child Element')
);

```

컴포넌트 내에 컴포넌트가 들어있는 경우 최상단의 React.createElement가 있고 children으로 또 다른 createElement가 실행되는 것을 확인할 수 있습니다.

저는 HTML로 parsing한 데이터를 이용해 createElement를 실행하는 방법으로 JSX 엘리먼트를 만들게 되었습니다. 순서는 간단하게 다음과 같습니다.

<p align="center">
  <img src="https://github.com/story-storage-project/storystorage-client/assets/84281505/fa576dc3-1cf0-4b2b-8e7d-fa0ffbf2488d" alt="textarea" />
</p>

1. string을 `DOMParser`로 실행하여 HTML NodeList 데이터를 얻습니다.
2. NodeList를 탐색하면서 node의 타입이 3(TEXT NODE) 또는 8(COMMENT)가 나오기 전까지 위와 같은 데이터 형식을 만듭니다. (혹시나 모를 중첩 에러를 대비해 데이터의 최상단 노드 타입으로 fragment를 설정했습니다.)
3. 2번에서 가공된 데이터를 이용해 createElement를 재귀적으로 실행하는 함수를 컴포넌트의 return문 안에서 실행하여 JSX 엘리먼트를 생성합니다. (JSX 엘리먼트는 Symbol 객체로 이루어져 있습니다.)

<br />

## 문자열을 CSS로 parsing하기

문자열을 CSS로 적용하기 위해 시도해본 건 크게 3가지입니다.

<br />

### React의 inline style로 적용해보기

제일 처음 string을 style로 적용하는 방법으로 떠올린 건 React의 inline style 방법이었습니다.

```js
return <div style={{ color: 'red' }}></div>;
```

React에서는 inline style을 객체를 이용해 적용할 수 있습니다.

문자열로 받은 CSS를 객체로 변환하여, HTML에서 JSX 엘리먼트를 생성할 때 props로 style 객체를 전달해주는 방식으로 적용하는 방식으로 진행하려 했습니다. 하지만 프로젝트 진행 도중, 이 방법으로는 hover나 focus등의 pseudo class를 사용하지 못한다는 문제점을 알게 됐습니다.

pseudo class를 지원하지 않고, 기본적인 style만 적용해보려고 했으나 유저가 pseudo class를 입력했을 때 그것을 제거하는 작업 또한 쉽지 않은 부분이 있어 다른 방식을 찾아보게 됐습니다.

<br />

### CSSOM에 접근해 style 적용하기

inline style의 한계를 느끼고 이제 다시 원점으로 돌아와 고민해보기 시작했습니다. 그러던 중 styled component나 emotion같은 CSS in JS 방식 라이브러리들은 어떻게 스타일을 적용하고 있는 거지? 라는 궁금증이 생겨 찾아보았습니다.

<p align="center">
  <img src="https://github.com/story-storage-project/storystorage-client/assets/84281505/69f889f9-a891-4807-a7bc-6f9598992a97" width="800" alt="textarea" />
</p>

styled component는 CSSStyleSheet를 생성하고 각 항목마다 CSSStyleRule이 생성되는 방식이었습니다. 대부분의 CSS in JS 방식이 이 방식을 사용한다는 것을 알게 됐습니다.

이것을 보고, 저도 CSSStyleRule을 추가하는 방식으로 구현하면 되지 않을까? 라는 생각이 들었습니다.

```js
const sheet = new CSSStyleSheet();
sheet.insertRule(...)
```

생성자 함수를 통해 간단하게 StyleSheet를 생성할 수 있고, `insertRule`을 통해 rule을 주입할 수 있습니다.

insertRule을 사용해서 할 수도 있지만, 저는 굉장히 간단한 방법으로도 CSSStyleSheet를 추가할 수 있다는 것을 알게 됐습니다. 바로 style 태그를 새로 생성하는 것입니다.

```js
style.current = document.createElement('style');
document.head.appendChild(style.current);
style.current.innerHTML = styleStringCode;
```

ref를 이용해 style element를 만들고 head에 추가합니다. 그리고 validation이 완료된 string code를 innerHTML을 이용해 추가하면 아주 간단하게 style을 설정할 수 있었습니다.

조금은 허무하지만 부족한 프로젝트 시간 내에서 style 적용 작업을 마무리하기 위해서 원초적인 방법인 innerHTML로 해결하게 되었습니다. innerHTML을 이용하면 hover 등 의사 클래스도 문제없이 적용되었고, 시간 안에 해결할 수 있었습니다.

<br />

## Atomic Design 적용

초반에 구조에 대한 방향을 지정하지 않고 프로젝트 진행을 하면서 도중에 구조를 변경하는 것은 꽤 시간이 오래 걸리고 힘든 작업이라는 걸 느끼게 되었습니다. 그래서 저는 프로젝트 초반에 명확한 기준을 도입하기 위해 재사용 목적에 잘 맞는 아토믹 디자인을 적용해보았습니다.

<br />

### Styled Component와 함께 적용하기

아토믹 디자인을 적용하면서 styled component를 활용했습니다. css in js 방식으로 props를 이용해 css 구성요소를 자유롭게 설정할 수 있다는 장점을 이용해 원자(Atom) 컴포넌트를 제작할 때 props를 적극 활용하게 되었습니다.

<br />

### 컴포넌트 구조 설계하기

아토믹 디자인은 원자(atom) 단위에서 분자(molecules), 유기체(organisms). 이렇게 점진적인 방식으로 구성됩니다. 이번 프로젝트 구조를 설계할 때에도 원자 단위부터 설계하고, 조합해 나가는 순서로 설계하였습니다.

구조를 설계하며 제일 고민했던 부분은 분자와 유기체를 구분하는 부분이었습니다. 분자와 유기체 둘 다 두 개 이상의 원자로도 구성될 수 있는 특성이 있어 둘의 경계가 모호하다고 생각했습니다. 둘을 합쳐 하나로 사용할 수도 있지만, 저는 둘의 경계를 context와 재사용성의 유무로 결정하게 됐습니다.

context가 포함된 경우 재사용성이 떨어진다 생각하여 유기체로 구성했고, context에 의존하지 않고 SRP를 지킬 수 있는 컴포넌트의 경우엔 분자로 구성하게 되었습니다. 이번 프로젝트에서 html, css의 두 가지 코드 에디터가 필요했는데 분자 컴포넌트로 `TextEditor` 를 설정하고 이것을 이용해 `CssCodeEditor`와 `HtmlCodeEditor`라는 유기체 컴포넌트를 제작했습니다.

<br />

### 아토믹 디자인 적용 후 느낀 점

적용 후 느낀 점으로는 크게 아래와 같습니다.

- 명확한 계층 구조로 컴포넌트 탐색이 쉽다.
- 좀 더 탄탄한 컴포넌트를 작성할 수 있다.
- 정형화된 틀이 없다.

저의 경우 기본적인 아토믹 디자인의 5가지 계층을 모두 적용하게 됐는데, 처음에는 헷갈렸던 구조가 적응 이후에는 폴더의 이름 자체가 크기로 느껴져 컴포넌트 탐색 시 좀 더 수월했던 경험을 했습니다.

아토믹 디자인을 적용하게 되면 초기 컴포넌트 설계를 형식에 맞춰 적용해야 하고, 컴포넌트의 크기를 구분해야 하므로 설계 시 시간이 많이 드는 특징이 있습니다. 아토믹 디자인을 적용하게 되면 좀 더 탄탄한 컴포넌트를 작성할 수 있다는 장점이 있습니다. 하지만 이 장점은 단점으로도 작용합니다.
탄탄한 컴포넌트가 될 수도 있지만 다른 추가 사항이 생긴다면 다시 수정해야 하는 데에도 드는 시간이 작지 않다는 점입니다. 이번 프로젝트처럼 저 혼자서 하는 프로젝트라면 저만의 규칙을 적용하면 되지만, 팀 프로젝트나 이미 진행 중인 프로젝트의 경우 구분 방식을 결정하는 커뮤니케이션에 대한 비용이 클 수 있지 않을까 라는 생각이 들었습니다.

<br />

## 반응형 제작

모바일, 태블릿, 데스크탑 3가지의 반응형으로 제작했습니다. 3가지 반응형 디자인을 피그마로 목업을 제작한 후 먼저 데스크탑 사이즈로 간단한 목업 페이지를 만들었습니다. 그리고 모바일 사이즈부터 미디어 쿼리를 이용해 적용했습니다.

모바일로도 확인할 수 있게되니 직접 사용하면서 어떤 점이 불편한지, 어떤 부분을 개선해야 하는지 즉각적으로 알 수 있었습니다.

<br />

### 스토리북을 활용한 반응형 제작

<p align="center">
  <img src="https://github.com/story-storage-project/storystorage-client/assets/84281505/563d7af8-692e-4423-9511-150847fbe996" width="800" alt="textarea" />
</p>

이번 반응형 제작에는 스토리북을 많이 활용하게 되었습니다. 스토리북에서는 뷰포트 사이즈를 설정할 수 있는 viewport addon을 적용해 간편하게 페이지들의 사이즈를 확인할 수 있었습니다. 처음엔 스토리북에 설정해야 할 것들이 꽤 있어 적용하는 부분에 시간이 조금 걸렸지만, 웹에서 각각의 페이지에 들어가지 않고도 페이지들을 확인할 수 있다는 점이 테스트하기에 용이했습니다.

<br />

### 반응형 도입 이후 코드 에디터의 크기 문제

제가 만든 코드 에디터는 textarea 위에 div 태그를 얹은 형태로 제작되어 있습니다. textarea의 caret만 이용하고 텍스트는 div로 감싸서 표시해주는 형태입니다.

처음에는 코드 에디터 사이즈를 고정하지 않고 유연하게 사이즈 조절이 되도록 설정하니 textarea와 div 태그가 조금씩 어긋나기 시작하는 문제가 생겼습니다. 사이즈와 속성값을 같게 설정했지만, 태그 내에 제가 알 수 없는 부분에서 오류가 생기기 시작했습니다.

사이즈를 뷰포트 사이즈에 맞게 3단계로 고정하려 했지만, 뷰포트의 각 단계에서 다음 단계로 갈 때 코드 에디터가 너무 작게 보이거나, 또는 너무 커서 짤려 보이는 문제가 있었습니다. 그래서 저는 코드 에디터 컴포넌트만 미디어 쿼리로 10단계의 고정형 사이즈를 설정하여 문제를 해결했습니다.

<br />

## Unit Test

테스트 작성이 익숙치 않아 좀 더 익혀보고자 라인 커버리지 60프로를 목표로 삼았고, 결과로는 서버와 클라이언트 모두 90프로 이상의 라인 커버리지를 달성했습니다.

<br />

### Test Util 제작하기

이번 테스트 때는 testing-library/react와 jest를 사용했습니다.

```js
function AllTheProviders({ children }) {
  return (
    <CookiesProvider>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </RecoilRoot>
    </CookiesProvider>
  );
}

const customRender = (ui, options) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export { customRender as render };
// testing-library의 render 대신 customRender를 import하여 사용합니다.
```

```js
tree = render(
  <CookiesProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Footer />
    </ThemeProvider>
  </CookiesProvider>,
);

// 이 방식으로 사용해야하는 것을

tree = render(<Footer />);

// 이렇게 간단하게 사용할 수 있습니다.
```

프로젝트 내에서는 Recoil과 Cookie Provider그리고 Theme Provider를 이용하기 때문에 컴포넌트를 테스트하기 위해서는 컴포넌트를 감싸야 하는 Provider들이 3개가 필요합니다. 테스트 시에 각 각의 컴포넌트마다 모두 Provider를 적용하게 된다면 코드가 길어지고 비효율적인 방법이 될 것입니다. 이를 방지하기 위해서 미리 적용한 AllTheProviders라는 Provider를 만들어 testing-library render의 wrapper로 AllTheProviders를 적용하는 커스텀 util을 만들어 사용했습니다.

<br />

### recoil을 사용하는 컴포넌트 테스트하기

Recoil을 사용하고 있는 컴포넌트를 테스트하는 게 제일 고민이 컸던 부분이었습니다. 커스텀훅으로 분리되어 있는 것이 아닐 때 컴포넌트 내 recoil state의 값의 변경을 테스트하는 건 쉽지 않았습니다. 이것을 해결하기 위해 recoil observer를 이용하게 되었습니다.

```js
export default function RecoilObserver({ node, onChange }) {
  const value = useRecoilValue(node);

  useEffect(() => onChange(value), [onChange, value]);

  return null;
}
```

RecoilObserver를 사용하여 node에 해당 recoil state의 이름을 넣고 컴포넌트가 렌더될 때 해당 state가 실행이 되었는지 또는 어떤 값과 실행됐는지 체크할 수 있었습니다.

```js
const onChange = jest.fn();

act(() => {
  render(
    <RecoilRoot>
      <RecoilObserver node={codeViewMode} onChange={onChange} />
      <CodeEditor />
    </RecoilRoot>,
  );
});

await waitFor(() => {
  expect(onChange).toHaveBeenCalledWith('allInOne');
});
```

위와 같은 방법으로 codeViewMode라는 recoil state가 “allInOne”이라는 값과 함께 호출 됐는지 확인할 수 있었습니다.

<br />

### 테스트를 작성하고 나서의 고찰

프로젝트 일정이 촉박하여 테스트 작성에 대한 충분한 고려를 하지 않고 테스트를 작성하게 되었습니다. 그러다보니 테스트 코드 작성이 더 까다롭고 어렵게 느껴져 조금은 답답한 감정을 느끼게 되었습니다. 제 테스트 코드에 대한 문제가 무엇인지 파악하기 위해 프로젝트 이후 단위 테스트에 대해 조금 더 공부해보는 시간을 가지게 되었습니다.
살펴보고 나니, 테스트를 작성하는 목적이 잘못 되었다는 것을 깨달았습니다. 라인 커버리지가 높다고 좋은 것이 아니며, 코드의 수가 많아질수록 유지보수성이 떨어진다는 걸 예상하지 못했던 것입니다.

앞으로 테스트를 작성해야 할 때는 커버리지에만 집중하는 것이 아니라, 해당 코드에서 중요한 부분과 필요한 테스트에 대해 신중히 고려한 후에 테스트를 작성해야 한다는 것을 배우게 됐습니다.

<br />

# Framework

| Frontend          | Backend      |
| ----------------- | ------------ |
| React             | Express      |
| Recoil            | jsonwebtoken |
| Styled Components | mongoose     |

<br />

# Installation

<details>
<summary>Client Installation</summary>

1. google console에서 google OAuth 2.0 클라이언트 ID를 발급받습니다.

2. 프로젝트를 다운 받은 후 프로젝트 디렉토리 내부에서 다음 명령어를 입력합니다.

```sh
npm start
```

3. 디렉토리 root 위치에 .env 파일을 생성하여 환경설정을 입력합니다.

```sh
REACT_APP_BASE_URL=<YOUR_SERVER_URL>
REACT_APP_CLIENT=<YOUR_CLIENT_URL>
REACT_APP_GOOGLE_OAUTH_CLIENT_ID=<YOUR_GOOGLE_OAUTH_CLIENT_ID>
REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET=<YOUR_GOOGLE_OAUTH_CLIENT_SECRET>
REACT_APP_GOOGLE_OAUTH_ENDPOINT=<YOUR_GOOGLE_OAUTH_ENDPOINT>
REACT_APP_GOOGLE_OAUTH_REDIRECT=<YOUR_GOOGLE_OAUTH_REDIRECT>
```

4. 완료

</details>

<details>
<summary>Server Installation</summary>

```sh
npm start
```

1. https://travistidwell.com/jsencrypt/demo/ 에서 원하는 keySize를 선택한 후 키를 발급받습니다.

2. https://www.base64encode.org/ 에서 Base64 포맷으로 1번에서 발급받은 두 개의 key를 인코딩합니다.

3. 프로젝트를 다운 받은 후 프로젝트 디렉토리 내부에서 다음 명령어를 입력합니다.

```sh
npm install
```

4. 디렉토리 root 위치에 .env 파일을 생성하여 환경설정을 입력합니다.

```sh
PORT=<YOUR_SERVER_PORT>
ORIGIN=<YOUR_ORIGIN_URL>
NODE_ENV=<YOUR_NODE_ENVIRONMENT>
DB_ID=<YOUR_MONGODB_ID>
DB_NAME=<YOUR_DATABASE_NAME>
DB_PASSWORD=<YOUR_DATABASE_PASSWORD>
DB_CLUSTER=<YOUR_DATABASE_CLUSTER>

ACCESS_TOKEN_PRIVATE_KEY=<YOUR_ACCESS_TOKEN_PRIVATE_KEY>
ACCESS_TOKEN_PUBLIC_KEY=<YOUR_ACCESS_TOKEN_PUBLIC_KEY>
REFRESH_TOKEN_PRIVATE_KEY=<YOUR_REFRESH_TOKEN_PRIVATE_KEY>
REFRESH_TOKEN_PUBLIC_KEY=<YOUR_REFRESH_TOKEN_PUBLIC_KEY>

ACCESS_TOKEN_EXPIRES_IN=<YOUR_ACCESS_TOKEN_EXPIRES_IN (example 2d...)>
REFRESH_TOKEN_EXPIRES_IN=<YOUR_REFRESH_TOKEN_EXPIRES_IN (example 14d...)>

GOOGLE_OAUTH_CLIENT_ID=<YOUR_GOOGLE_OAUTH_CLIENT_ID>
GOOGLE_OAUTH_CLIENT_SECRET=<YOUR_GOOGLE_OAUTH_CLIENT_SECRET>
GOOGLE_OAUTH_REDIRECT_URL=<YOUR_GOOGLE_OAUTH_REDIRECT>
```

5. 완료

```sh
npm start
```

</details>

<br />

# Schedule

- 2022.11

- 11.07 ~ 11.09 : 아이디어 수집 및 기획
- 11.10 ~ 11.12 : 구현 가능 여부 조사, 기술 스택 검증, Mock-up(figma) 작업
- 11.13 ~ 11.14 : Mock-up(component) 작업, 레이아웃 반응형 제작
- 11.15 ~ 11.17 : 코드 에디터 제작
- 11.17 ~ 11.19 : html dom parsing 작업, 코드 에디터 보완작업
- 11.19 ~ 11.20 : 로그인 작업
- 11.21 ~ 11.24 : html 엘리먼트 수정 작업 및 리팩토링
- 11.24 ~ 11.25 : 배포
- 11.26 ~ 12.30: 리팩토링, 테스트 코드 작성

<br />

# Creator

- 임현정 glowhyun1@gmail.com
