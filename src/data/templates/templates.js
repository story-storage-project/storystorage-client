// https://getcssscan.com/css-buttons-examples

export default [
  {
    _id: 'z0TonHSxtj',
    name: 'template-button-01',
    category: 'template-button',
    html: `<button class="button-63" role="button">Button 63</button>`,
    css: `.button-63 {
      align-items: center;
      background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
      border: 0;
      border-radius: 8px;
      box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
      box-sizing: border-box;
      color: #FFFFFF;
      display: flex;
      font-family: Phantomsans, sans-serif;
      font-size: 20px;
      justify-content: center;
      line-height: 1em;
      max-width: 100%;
      min-width: 140px;
      padding: 19px 24px;
      text-decoration: none;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      white-space: nowrap;
      cursor: pointer;
    }

    .button-63:active,
    .button-63:hover {
      outline: 0;
    }

    @media (min-width: 768px) {
      .button-63 {
        font-size: 24px;
        min-width: 196px;
      }
    }`,
  },
  {
    _id: 'RDCX5wY5eL',
    name: 'template-button-02',
    category: 'template-button',
    html: `<button class="button-69" role="button">Button 69</button>`,
    css: `.button-69 {
      background-color: initial;
      background-image: linear-gradient(#8614f8 0, #760be0 100%);
      border-radius: 5px;
      border-style: none;
      box-shadow: rgba(245, 244, 247, .25) 0 1px 1px inset;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-family: Inter, sans-serif;
      font-size: 16px;
      font-weight: 500;
      height: 60px;
      line-height: 60px;
      margin-left: -4px;
      outline: 0;
      text-align: center;
      transition: all .3s cubic-bezier(.05, .03, .35, 1);
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      vertical-align: bottom;
      width: 190px;
    }

    .button-69:hover {
      opacity: .7;
    }

    @media screen and (max-width: 1000px) {
      .button-69 {
        font-size: 14px;
        height: 55px;
        line-height: 55px;
        width: 150px;
      }
    }`,
  },
  {
    _id: 'X8TXC5EMc4',
    name: 'template-button-03',
    category: 'template-button',
    html: `<button class="button-74" role="button">Button 74</button>`,
    css: `.button-74 {
      background-color: #fbeee0;
      border: 2px solid #422800;
      border-radius: 30px;
      box-shadow: #422800 4px 4px 0 0;
      color: #422800;
      cursor: pointer;
      display: inline-block;
      font-weight: 600;
      font-size: 18px;
      padding: 0 18px;
      line-height: 50px;
      text-align: center;
      text-decoration: none;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    .button-74:hover {
      background-color: #fff;
    }

    .button-74:active {
      box-shadow: #422800 2px 2px 0 0;
      transform: translate(2px, 2px);
    }

    @media (min-width: 768px) {
      .button-74 {
        min-width: 120px;
        padding: 0 25px;
      }
    }`,
  },
  {
    _id: 'T8Dw6Z778c',
    name: 'template-button-04',
    category: 'template-button',
    html: `<button class="button-82-pushable" role="button">
      <span class="button-82-shadow"></span>
      <span class="button-82-edge"></span>
      <span class="button-82-front text">
        Button 82
      </span>
    </button>`,
    css: `.button-82-pushable {
      position: relative;
      border: none;
      background: transparent;
      padding: 0;
      cursor: pointer;
      outline-offset: 4px;
      transition: filter 250ms;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    .button-82-shadow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      background: hsl(0deg 0% 0% / 0.25);
      will-change: transform;
      transform: translateY(2px);
      transition:
        transform
        600ms
        cubic-bezier(.3, .7, .4, 1);
    }

    .button-82-edge {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      background: linear-gradient(
        to left,
        hsl(340deg 100% 16%) 0%,
        hsl(340deg 100% 32%) 8%,
        hsl(340deg 100% 32%) 92%,
        hsl(340deg 100% 16%) 100%
      );
    }

    .button-82-front {
      display: block;
      position: relative;
      padding: 12px 27px;
      border-radius: 12px;
      font-size: 1.1rem;
      color: white;
      background: hsl(345deg 100% 47%);
      will-change: transform;
      transform: translateY(-4px);
      transition:
        transform
        600ms
        cubic-bezier(.3, .7, .4, 1);
    }

    @media (min-width: 768px) {
      .button-82-front {
        font-size: 1.25rem;
        padding: 12px 42px;
      }
    }

    .button-82-pushable:hover {
      filter: brightness(110%);
      -webkit-filter: brightness(110%);
    }

    .button-82-pushable:hover .button-82-front {
      transform: translateY(-6px);
      transition:
        transform
        250ms
        cubic-bezier(.3, .7, .4, 1.5);
    }

    .button-82-pushable:active .button-82-front {
      transform: translateY(-2px);
      transition: transform 34ms;
    }

    .button-82-pushable:hover .button-82-shadow {
      transform: translateY(4px);
      transition:
        transform
        250ms
        cubic-bezier(.3, .7, .4, 1.5);
    }

    .button-82-pushable:active .button-82-shadow {
      transform: translateY(1px);
      transition: transform 34ms;
    }

    .button-82-pushable:focus:not(:focus-visible) {
      outline: none;
    }`,
  },
  {
    _id: 'E8LxUmcQVz',
    name: 'template-button-04',
    category: 'template-button',
    html: `<button class="button-41" role="button">Button 41</button>`,
    css: `.button-41 {
      background-color: initial;
      background-image: linear-gradient(-180deg, #00D775, #00BD68);
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
      color: #FFFFFF;
      cursor: pointer;
      display: inline-block;
      font-family: Inter,-apple-system,system-ui,Roboto,"Helvetica Neue",Arial,sans-serif;
      height: 44px;
      line-height: 44px;
      outline: 0;
      overflow: hidden;
      padding: 0 20px;
      pointer-events: auto;
      position: relative;
      text-align: center;
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
      vertical-align: top;
      white-space: nowrap;
      width: 100%;
      z-index: 9;
      border: 0;
    }

    .button-41:hover {
      background: #00bd68;
    }`,
  },
  {
    _id: '7nVDittlhk',
    name: 'template-button-05',
    category: 'template-button',
    html: `<button class="button-35" role="button">Button 35</button>`,
    css: `.button-35 {
      align-items: center;
      background-color: #fff;
      border-radius: 12px;
      box-shadow: transparent 0 0 0 3px,rgba(18, 18, 18, .1) 0 6px 20px;
      box-sizing: border-box;
      color: #121212;
      cursor: pointer;
      display: inline-flex;
      flex: 1 1 auto;
      font-family: Inter,sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      justify-content: center;
      line-height: 1;
      margin: 0;
      outline: none;
      padding: 1rem 1.2rem;
      text-align: center;
      text-decoration: none;
      transition: box-shadow .2s,-webkit-box-shadow .2s;
      white-space: nowrap;
      border: 0;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    .button-35:hover {
      box-shadow: #121212 0 0 0 3px, transparent 0 0 0 0;
    }`,
  },
  {
    _id: 'ngDmOClGpD',
    name: 'template-button-06',
    category: 'template-button',
    html: `<button class="button-51" role="button">Button 51</button>`,
    css: `.button-51 {
      background-color: transparent;
      border: 1px solid #266DB6;
      box-sizing: border-box;
      color: #00132C;
      font-family: "Avenir Next LT W01 Bold",sans-serif;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      padding: 16px 23px;
      position: relative;
      text-decoration: none;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    .button-51:hover,
    .button-51:active {
      outline: 0;
    }

    .button-51:hover {
      background-color: transparent;
      cursor: pointer;
    }

    .button-51:before {
      background-color: #D5EDF6;
      content: "";
      height: calc(100% + 3px);
      position: absolute;
      right: -7px;
      top: -9px;
      transition: background-color 300ms ease-in;
      width: 100%;
      z-index: -1;
    }

    .button-51:hover:before {
      background-color: #6DCFF6;
    }

    @media (min-width: 768px) {
      .button-51 {
        padding: 16px 32px;
      }
    }`,
  },
  {
    _id: 'joJy6JSDro',
    name: 'template-button-07',
    category: 'template-button',
    html: `<button class="button-52" role="button">Button 52</button>`,
    css: `.button-52 {
      font-size: 16px;
      font-weight: 200;
      letter-spacing: 1px;
      padding: 13px 20px 13px;
      outline: 0;
      border: 1px solid black;
      cursor: pointer;
      position: relative;
      background-color: rgba(0, 0, 0, 0);
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    .button-52:after {
      content: "";
      background-color: #ffe54c;
      width: 100%;
      z-index: -1;
      position: absolute;
      height: 100%;
      top: 7px;
      left: 7px;
      transition: 0.2s;
    }

    .button-52:hover:after {
      top: 0px;
      left: 0px;
    }

    @media (min-width: 768px) {
      .button-52 {
        padding: 13px 50px 13px;
      }
    }`,
  },
  {
    _id: 'vfjlu6Yzn8',
    name: 'template-button-08',
    category: 'template-button',
    html: `<button class="button-57" role="button"><span class="text">Button 57</span><span>Alternate text</span></button>`,
    css: `.button-57 {
      position: relative;
      overflow: hidden;
      border: 1px solid #18181a;
      color: #18181a;
      display: inline-block;
      font-size: 15px;
      line-height: 15px;
      padding: 18px 18px 17px;
      text-decoration: none;
      cursor: pointer;
      background: #fff;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    .button-57 span:first-child {
      position: relative;
      transition: color 600ms cubic-bezier(0.48, 0, 0.12, 1);
      z-index: 10;
    }

    .button-57 span:last-child {
      color: white;
      display: block;
      position: absolute;
      bottom: 0;
      transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);
      z-index: 100;
      opacity: 0;
      top: 50%;
      left: 50%;
      transform: translateY(225%) translateX(-50%);
      height: 14px;
      line-height: 13px;
    }

    .button-57:after {
      content: "";
      position: absolute;
      bottom: -50%;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      transform-origin: bottom center;
      transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
      transform: skewY(9.3deg) scaleY(0);
      z-index: 50;
    }

    .button-57:hover:after {
      transform-origin: bottom center;
      transform: skewY(9.3deg) scaleY(2);
    }

    .button-57:hover span:last-child {
      transform: translateX(-50%) translateY(-100%);
      opacity: 1;
      transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
    }`,
  },
  {
    _id: '2UPUFpW7n2',
    name: 'template-button-09',
    category: 'template-button',
    html: `<button class="button-32" role="button">Button 32</button>`,
    css: `.button-32 {
      background-color: #fff000;
      border-radius: 12px;
      color: #000;
      cursor: pointer;
      font-weight: bold;
      padding: 10px 15px;
      text-align: center;
      transition: 200ms;
      width: 100%;
      box-sizing: border-box;
      border: 0;
      font-size: 16px;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    .button-32:not(:disabled):hover,
    .button-32:not(:disabled):focus {
      outline: 0;
      background: #f4e603;
      box-shadow: 0 0 0 2px rgba(0,0,0,.2), 0 3px 8px 0 rgba(0,0,0,.15);
    }

    .button-32:disabled {
      filter: saturate(0.2) opacity(0.5);
      -webkit-filter: saturate(0.2) opacity(0.5);
      cursor: not-allowed;
    }`,
  },
  {
    _id: '1RI0t7SEI0',
    name: 'template-button-10',
    category: 'template-button',
    html: `<button class="button-29" role="button">Button 29</button>`,
    css: `.button-29 {
      align-items: center;
      appearance: none;
      background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
      border: 0;
      border-radius: 6px;
      box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      display: inline-flex;
      font-family: "JetBrains Mono",monospace;
      height: 48px;
      justify-content: center;
      line-height: 1;
      list-style: none;
      overflow: hidden;
      padding-left: 16px;
      padding-right: 16px;
      position: relative;
      text-align: left;
      text-decoration: none;
      transition: box-shadow .15s,transform .15s;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      white-space: nowrap;
      will-change: box-shadow,transform;
      font-size: 18px;
    }

    .button-29:focus {
      box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
    }

    .button-29:hover {
      box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
      transform: translateY(-2px);
    }

    .button-29:active {
      box-shadow: #3c4fe0 0 3px 7px inset;
      transform: translateY(2px);
    }`,
  },
];
