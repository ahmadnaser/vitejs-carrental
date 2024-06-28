import React from 'react';
import '../index.css'
function Step3() {
  return (
    <div className="h-screen left-nav-grid-columns">
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n            /* Hide chat button during demo */\n            \n\n            /* Part of the generated embed code from Salesforce */\n            .embeddedServiceHelpButton .helpButton .uiButton {\n                background-color: #3E45F2;\n            }\n\n            /* Part of the generated embed code from Salesforce */\n            .embeddedServiceHelpButton .helpButton .uiButton:focus {\n                outline: 1px solid #3E45F2;\n            }\n\n            /* Override tailwind default size for minimize and close buttons */\n            .embeddedServiceSidebar embeddedservice-chat-header svg {\n                height: 20px;\n            }\n\n            /* Override the default tailwind text color */\n            .embeddedServiceSidebar h1,\n            .embeddedServiceSidebar h2,\n            .embeddedServiceSidebar h3,\n            .embeddedServiceSidebar h4,\n            .embeddedServiceSidebar h5,\n            .embeddedServiceSidebar h6,\n            .embeddedServiceSidebar div,\n            .embeddedServiceSidebar span,\n            .embeddedServiceSidebar p {\n                color: inherit;\n            }\n\n            @media only screen and (max-width: 48em) {\n              .embeddedServiceHelpButton .helpButton {\n                bottom: var(--helpBottom) !important;\n              }\n            }\n            ',
        }}
      />
      <nav
        id="side-nav"
        className="h-screen bg-dark-gray py-8 flex flex-col dark-scrollbar-side-nav w-60 h-[calc(100vh-13.25rem)] overflow-x-hidden overflow-y-auto"
      >
        <div className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="fill-current h-6 cursor-pointer pl-3"
          >
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          <a href="/" target="_self" rel="noreferrer" className="link mx-auto">
            <div className="flex items-center">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0, 0, 2000, 388"
                height="25.5"
                className="fill-white"
              >
                <title>BloomTech Logo</title>
                <g>
                  <path
                    className="fill-white"
                    d="M95.4,153c-12.2,12.2-12.2,31.9,0,44.1l59.1,59.1l-25,25l-63.4-63.4c-23.6-23.6-23.6-61.9,0-85.5l131-131
		l-67,0l-99.1,99.1c-41.2,41.2-41.2,108,0,149.2l98.6,98.6l0,0l151.2-151.2c12.2-12.2,12.2-31.9,0-44.1l-59.1-59.1l25-25l63.4,63.4
		c23.6,23.6,23.6,61.9,0,85.5l-131,131l67,0l99.1-99.1c41.2-41.2,41.2-108,0-149.2L246.6,1.8l0,0L95.4,153z"
                  />
                  <g>
                    <path
                      d="M521.1,148.5V1.3h52.1c18.9,0,34.3,2,43.2,11.1c5.9,5.9,9.5,14.8,9.5,26.7c0,19.8-10.4,28-19.1,32.8v0.4
  			c9.8,4.1,23.4,15,23.4,35.4c0,13.5-4.1,23.2-10.4,29.5c-9.8,9.6-25.4,11.3-44.7,11.3H521.1z M574.2,64.1c9.5,0,16.1-0.7,20.8-5.6
  			c3.3-3,5-8.9,5-16.5c0-7.4-1.7-13-5-16.3c-4.8-4.8-11.3-5.6-20.8-5.6h-28.4v44.1H574.2z M577.3,129.8c10.2,0,16.9-1.1,21.9-6.1
  			c3.7-3.7,5.2-9.8,5.2-17.6c0-8-1.5-13.7-5.2-17.4c-5-5-11.7-6.1-21.9-6.1h-31.5v47.1H577.3z"
                    />
                    <path d="M675.2,148.5H652V1.3h23.2V148.5z" />
                    <path
                      d="M791.5,139.2c-9.5,8.9-23,12.4-38.6,12.4c-15.8,0-29.3-3.5-38.9-12.4c-9.5-8.9-15.2-23.7-15.2-46c0-22.6,5.6-37.1,15.2-46
  			c9.5-9.1,23-12.4,38.9-12.4c15.6,0,29.1,3.3,38.6,12.4c9.8,8.9,15.4,23.4,15.4,46C807,115.5,801.3,130.3,791.5,139.2z M773.5,59.7
  			c-5.2-5.2-11.9-6.9-20.6-6.9c-8.7,0-15.6,1.7-20.6,6.9c-6.1,5.9-8.9,16.5-8.9,33.4s2.8,27.4,8.9,33.4c5,5,11.9,6.9,20.6,6.9
  			c8.7,0,15.4-2,20.6-6.9c5.9-6.1,8.7-16.5,8.7-33.4S779.4,65.6,773.5,59.7z"
                    />
                    <path
                      d="M916.8,139.2c-9.5,8.9-23,12.4-38.6,12.4c-15.8,0-29.3-3.5-38.9-12.4c-9.5-8.9-15.2-23.7-15.2-46c0-22.6,5.6-37.1,15.2-46
  			c9.5-9.1,23-12.4,38.9-12.4c15.6,0,29.1,3.3,38.6,12.4c9.8,8.9,15.4,23.4,15.4,46C932.2,115.5,926.6,130.3,916.8,139.2z
  			 M898.8,59.7c-5.2-5.2-11.9-6.9-20.6-6.9c-8.7,0-15.6,1.7-20.6,6.9c-6.1,5.9-8.9,16.5-8.9,33.4s2.8,27.4,8.9,33.4
  			c5,5,11.9,6.9,20.6,6.9c8.7,0,15.4-2,20.6-6.9c5.9-6.1,8.7-16.5,8.7-33.4S904.6,65.6,898.8,59.7z"
                    />
                    <path
                      d="M1083.7,35.4c25.8,0,34.5,10.9,34.5,34.5v78.6H1095V74.3c0-14.5-4.1-19.8-17.4-19.8c-10.9,0-21.9,6.5-29.1,16.3v77.7
  			h-23.2V74.3c0-14.5-4.1-19.8-17.1-19.8c-10.9,0-21.9,6.5-29.1,16.5v77.5h-23.2V37.8h16.3l3.3,15h0.4c11.5-12.6,25-17.4,38.4-17.4
  			c17.8,0,27.4,5.4,31.5,16.7h0.4C1057.5,40,1070.5,35.4,1083.7,35.4z"
                    />
                    <path d="M1212.2,148.5h-24.7V1.3h24.7V148.5z" />
                    <path
                      d="M1263.6,52.8c12.4-12.6,27.1-17.4,41.7-17.4c27.3,0,36.5,10.9,36.5,34.5v78.6h-23.2v-74c0-14.8-4.6-19.7-19.3-19.7
  			c-12.2,0-24.5,6.3-32.3,16.3v77.5h-23.2V37.8h16.3l3.3,15H1263.6z"
                    />
                    <path
                      d="M1430.8,117c0-13.9-10.4-14.3-24.5-14.5c-20.2-0.6-41.9-4.1-41.9-34.5c0-25,21.3-33.2,48.2-33.2c6.3,0,22.8,0.9,32.3,4.1
  			v18c-11.9-3.3-25.4-3.9-32.3-3.9c-16.1,0-24.7,4.6-24.7,14.1c0,13.5,11.1,13.2,23.9,13.7c19.3,0.7,42.5,3.7,42.5,34.7
  			c0,25.2-22.4,36-52.1,36c-6.1,0-23.9-1.3-36.2-5.4V127c12.4,3.7,28.9,5,36.2,5C1422.7,132,1430.8,126.8,1430.8,117z"
                    />
                    <path d="M1583.8,23h-26.5V1.3h26.5V23z M1582.3,148.5h-23.2V37.8h23.2V148.5z" />
                    <path
                      d="M1773.8,133.3c-12.4,12.8-27.1,17.6-41.7,17.6c-27.4,0-36.5-11.5-36.5-35.2V37.8h23.2v74c0,14.5,4.6,19.8,19.3,19.8
  			c12.2,0,24.5-6.5,32.3-16.3V37.8h23.2v110.7h-16.3l-3.3-15.2H1773.8z"
                    />
                    <path
                      d="M1890.8,146.1c-7.8,3.3-19.1,4.3-27.8,4.3c-24.3,0-32.1-8.2-32.1-38.6V55.4h-18.7V37.6h20.6V13.1h21.5v24.5h35.4v17.8
  			h-35.6v56.2c0,16.3,2.8,20,16.9,20c4.6,0,14.5-1.3,19.7-3.5V146.1z"
                    />
                    <path
                      d="M1927.1,98.1c0.2,11.7,2,21.1,8.2,27.1c5.4,5.4,13.7,7.6,26.3,7.6c8.5,0,22.6-1.1,33.6-4.8v18c-10.9,3.7-26.9,5.4-38,5.4
  			c-39.1,0-54.9-18.7-54.9-58.4c0-44.1,22.8-58.4,51.7-58.4c32.1,0,46,15.8,46,46.9c0,3.3-0.4,11.5-1.1,16.5H1927.1z M1935.5,59.1
  			c-4.6,4.6-6.9,11.7-7.8,21.9h49.7c0.2-2.8,0.2-4.1,0.2-4.6c0-7.8-1.7-14.1-5.6-18c-3.9-4.1-10.2-5.6-17.8-5.6
  			C1947.3,52.8,1940.3,54.3,1935.5,59.1z"
                    />
                    <path
                      d="M603.3,339.2c-9.5,8.9-23,12.4-38.6,12.4c-15.8,0-29.3-3.5-38.9-12.4c-9.5-8.9-15.2-23.7-15.2-46c0-22.6,5.6-37.1,15.2-46
  			c9.5-9.1,23-12.4,38.9-12.4c15.6,0,29.1,3.3,38.6,12.4c9.8,8.9,15.4,23.4,15.4,46C618.7,315.5,613,330.3,603.3,339.2z
  			 M585.2,259.8c-5.2-5.2-11.9-6.9-20.6-6.9c-8.7,0-15.6,1.7-20.6,6.9c-6.1,5.9-8.9,16.5-8.9,33.4s2.8,27.4,8.9,33.4
  			c5,5,11.9,6.9,20.6,6.9c8.7,0,15.4-2,20.6-6.9c5.9-6.1,8.7-16.5,8.7-33.4S591.1,265.6,585.2,259.8z"
                    />
                    <path
                      d="M672.3,348.5h-23.2v-93.1h-18.7v-16.9h18.7v-5.6c0-27.6,12.2-33.9,37.5-33.9c5.2,0,14.6,1.4,18.6,2.6v17.1
  			c-5.2-1.2-12.9-2-17-2c-9.6,0-15.9,3.3-15.9,15.2v5.9h30.5v17.6h-30.5V348.5z"
                    />
                    <path d="M822.5,348.5h-25V220.7h-42.3v-19.3h109.6v19.3h-42.3V348.5z" />
                    <path
                      d="M885.2,298.2c0.2,11.7,2,21.1,8.2,27.1c5.4,5.4,13.7,7.6,26.3,7.6c8.5,0,22.6-1.1,33.6-4.8v18c-10.9,3.7-26.9,5.4-38,5.4
  			c-39.1,0-54.9-18.7-54.9-58.4c0-44.1,22.8-58.4,51.7-58.4c32.1,0,46,15.8,46,46.9c0,3.3-0.4,11.5-1.1,16.5H885.2z M893.7,259.1
  			c-4.6,4.6-6.9,11.7-7.8,21.9h49.7c0.2-2.8,0.2-4.1,0.2-4.6c0-7.8-1.7-14.1-5.6-18c-3.9-4.1-10.2-5.6-17.8-5.6
  			C905.4,252.8,898.5,254.3,893.7,259.1z"
                    />
                    <path
                      d="M1061.5,346.2c-11.9,4.1-22.8,5.4-31.7,5.4c-38,0-54.3-18.5-54.3-58.4c0-32.8,10-58.4,55.1-58.4c7.2,0,17.8,0.6,28,4.1v18
  			c-8.7-2.8-18.5-3.7-25.4-3.7c-11.1,0-18.9,2-24.3,7.4c-5.9,5.9-8.7,17.8-8.7,32.6c0,15,2.6,25.4,8.9,31.7
  			c5.4,5.4,13.2,6.9,24.1,6.9c6.3,0,17.6-1.1,28.2-4.8V346.2z"
                    />
                    <path
                      d="M1143.6,235.5c27.3,0,36.5,10.9,36.5,34.5v78.6h-23.2v-74c0-14.8-4.6-19.7-19.3-19.7c-12.2,0-24.5,6.3-32.3,16.3v77.5
  			h-23.2V201.4h23.2v48.4h0.4C1117.3,239.4,1130.5,235.5,1143.6,235.5z"
                    />
                    <path
                      d="M1228.4,252.8c12.4-12.6,27.1-17.4,41.7-17.4c27.4,0,36.5,10.9,36.5,34.5v78.6h-23.2v-74c0-14.8-4.6-19.7-19.3-19.7
  			c-12.1,0-24.5,6.3-32.3,16.3v77.5h-23.2V237.8h16.3l3.3,15H1228.4z"
                    />
                    <path
                      d="M1421.2,339.2c-9.5,8.9-23,12.4-38.6,12.4c-15.8,0-29.3-3.5-38.9-12.4c-9.5-8.9-15.2-23.7-15.2-46
  			c0-22.6,5.6-37.1,15.2-46c9.5-9.1,23-12.4,38.9-12.4c15.6,0,29.1,3.3,38.6,12.4c9.8,8.9,15.4,23.4,15.4,46
  			C1436.6,315.5,1431,330.3,1421.2,339.2z M1403.2,259.8c-5.2-5.2-11.9-6.9-20.6-6.9c-8.7,0-15.6,1.7-20.6,6.9
  			c-6.1,5.9-8.9,16.5-8.9,33.4s2.8,27.4,8.9,33.4c5,5,11.9,6.9,20.6,6.9c8.7,0,15.4-2,20.6-6.9c5.9-6.1,8.7-16.5,8.7-33.4
  			S1409,265.6,1403.2,259.8z"
                    />
                    <path d="M1483.5,348.5h-23.2V201.4h23.2V348.5z" />
                    <path
                      d="M1599.9,339.2c-9.5,8.9-23,12.4-38.6,12.4c-15.8,0-29.3-3.5-38.9-12.4c-9.5-8.9-15.2-23.7-15.2-46
  			c0-22.6,5.6-37.1,15.2-46c9.5-9.1,23-12.4,38.9-12.4c15.6,0,29.1,3.3,38.6,12.4c9.8,8.9,15.4,23.4,15.4,46
  			C1615.3,315.5,1609.6,330.3,1599.9,339.2z M1581.8,259.8c-5.2-5.2-11.9-6.9-20.6-6.9c-8.7,0-15.6,1.7-20.6,6.9
  			c-6.1,5.9-8.9,16.5-8.9,33.4s2.8,27.4,8.9,33.4c5,5,11.9,6.9,20.6,6.9c8.7,0,15.4-2,20.6-6.9c5.9-6.1,8.7-16.5,8.7-33.4
  			S1587.7,265.6,1581.8,259.8z"
                    />
                    <path
                      d="M1733.1,342.9c0,38.9-28.9,45.1-53,45.1c-10.2,0-27.8-1.3-39.5-5.4v-19.1c11.7,3.7,25.4,5.2,36.7,5.2
  			c23.2,0,32.6-7.8,32.6-24.1v-13.9h-0.4c-9.1,8.2-20,11.5-30.4,11.5c-31,0-46.7-16.7-46.7-53.4c0-35.4,17.6-53.4,51.9-53.4
  			c8.2,0,21.3,2.4,30.6,9.8h0.4l2.8-7.4h15V342.9z M1709.9,262.4c-5.6-5.4-15.2-8.2-24.1-8.2c-19.8,0-28.7,10.6-28.7,34.7
  			c0,25.8,8.9,34.3,26.7,34.3c10,0,20.2-6.1,26-14.5V262.4z"
                    />
                    <path
                      d="M1859.9,237.8L1799.8,385h-24.1l16.3-39.9l-43.9-107.2h25l18.5,47.1c5.4,14.1,8.7,22.8,13,35.6h0.4
  			c4.1-12.8,7.6-21.7,12.8-35.6l18.7-47.1H1859.9z"
                    />
                    <path
                      d="M1679.6,146.1c-7.8,3.3-19.1,4.3-27.8,4.3c-24.3,0-32.1-8.2-32.1-38.6V55.4H1601V37.6h20.6V13.1h21.5v24.5h35.4v17.8
  			h-35.6v56.2c0,16.3,2.8,20,16.9,20c4.6,0,14.5-1.3,19.7-3.5V146.1z"
                    />
                    <path
                      d="M1541,146.1c-7.8,3.3-19.1,4.3-27.8,4.3c-24.3,0-32.1-8.2-32.1-38.6V55.4h-18.7V37.6h20.6V13.1h21.5v24.5h35.4v17.8h-35.6
  			v56.2c0,16.3,2.8,20,16.9,20c4.6,0,14.5-1.3,19.7-3.5V146.1z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </a>
        </div>
        <ul className="pt-5">
          <li
            data-testid="Home"
            className="pointer whitespace-nowrap hover:bg-charcoal"
          >
            <a href="/" target="_self" rel="noreferrer" className="link">
              <div className="flex items-center">
                <div className="left-nav-item px-4 py-3 flex items-center">
                  <div className="text-silver">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="fill-current h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="left-nav-label pl-3 text-silver">Home</span>
                </div>
              </div>
            </a>
          </li>
          <li
            data-testid="Live Classes"
            className="pointer whitespace-nowrap hover:bg-charcoal relative"
          >
            <a
              href="/live-events"
              target="_self"
              rel="noreferrer"
              className="link"
            >
              <div className="flex items-center">
                <div className="left-nav-item px-4 py-3 flex items-center">
                  <div className="text-silver">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="fill-current h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="left-nav-label pl-3 text-silver">
                    Live Classes
                  </span>
                </div>
              </div>
            </a>
            <div className="absolute z-50 m-0 p-0 card-shadow hidden group-hover:flex group-focus:flex flex-row -top-[3em] -right-[33em]">
              <div className="flex p-0 m-0 py-3">
                <div className="w-0 h-0 m-0 border-[1em] border-transparent border-b-[2em] border-b-boysenberry border-b-[2rem] border-[1.5rem] mt-8 -rotate-90" />
              </div>
              <div className="p-3 font-open-sans font-normal normal-case rounded-xl border border-transparent border-solid shadow-2xl bg-boysenberry w-[30rem]">
                <div
                  id="LESSONS"
                  className="demo m-0 bg-transparent w-full h-full p-5"
                >
                  <div className="h-5 flex justify-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="cursor-pointer h-full"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </div>
                  <div className="content">
                    <div className="opacity-[.5] mb-2">
                      <span>-1</span> of <span>-1</span>
                    </div>
                    <h2 className="relative font-titillium font-semibold text-3xl leading-12 text-[1.3rem] mb-2">
                      Live Classes
                    </h2>
                    <div className="whitespace-pre-wrap">
                      On our Live Classes page, you can register and join our
                      welcome events and Code-Alongs to get to know BloomTech.
                    </div>
                    <div className="flex w-full h-[15%] gap-2 mt-6 justify-end" />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li
            data-testid="Full Curriculum"
            className="pointer whitespace-nowrap hover:bg-charcoal"
          >
            <a
              href="/full-curriculum"
              target="_self"
              rel="noreferrer"
              className="link"
            >
              <div className="flex items-center">
                <div className="left-nav-item px-4 py-3 flex items-center">
                  <div className="text-silver">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="fill-current h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="left-nav-label pl-3 text-silver">
                    Full Curriculum
                  </span>
                </div>
              </div>
            </a>
          </li>
          <li
            data-testid="Enrollment Coach"
            className="pointer whitespace-nowrap hover:bg-charcoal relative"
          >
            <a
              href="/coaching"
              target="_self"
              rel="noreferrer"
              className="link"
            >
              <div className="flex items-center">
                <div className="left-nav-item px-4 py-3 flex items-center">
                  <div className="text-silver">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="fill-current h-6"
                    >
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
                    </svg>
                  </div>
                  <span className="left-nav-label pl-3 text-silver">
                    Enrollment Coach
                  </span>
                </div>
              </div>
            </a>
            <div className="absolute z-50 m-0 p-0 card-shadow hidden group-hover:flex group-focus:flex flex-row -top-[8.5em] -right-[33em]">
              <div className="flex p-0 m-0 items-center">
                <div className="w-0 h-0 m-0 border-[1em] border-transparent border-b-[2em] border-b-boysenberry border-b-[2rem] border-[1.5rem] -rotate-90" />
              </div>
              <div className="p-3 font-open-sans font-normal normal-case rounded-xl border border-transparent border-solid shadow-2xl bg-boysenberry w-[30rem]">
                <div
                  id="COACH"
                  className="demo m-0 bg-transparent w-full h-full p-5"
                >
                  <div className="h-5 flex justify-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="cursor-pointer h-full"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </div>
                  <div className="content">
                    <div className="opacity-[.5] mb-2">
                      <span>-1</span> of <span>-1</span>
                    </div>
                    <h2 className="relative font-titillium font-semibold text-3xl leading-12 text-[1.3rem] mb-2">
                      Your Enrollment Coach
                    </h2>
                    <div className="whitespace-pre-wrap">
                      Visit here to connect with your Coach to discuss tuition
                      options such as Deferred Tuition ($0 Upfront) and our
                      Tuition Refund Guarantee. Terms apply.
                    </div>
                    <div className="flex w-full h-[15%] gap-2 mt-6 justify-end" />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li
            data-testid="Enrollment Checklist"
            className="pointer whitespace-nowrap hover:bg-charcoal"
          >
            <a
              href="/enrollment-checklist"
              target="_self"
              rel="noreferrer"
              className="link"
            >
              <div className="flex items-center">
                <div className="left-nav-item px-4 py-3 flex items-center">
                  <div className="text-silver">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="fill-current h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="left-nav-label pl-3 text-silver">
                    Enrollment Checklist
                  </span>
                </div>
              </div>
            </a>
          </li>
          <li
            data-testid="Free Trial Course"
            className="pointer whitespace-nowrap hover:bg-charcoal"
          >
            <a
              href="/courses/free-trial"
              target="_self"
              rel="noreferrer"
              className="link"
            >
              <div className="flex items-center">
                <div className="left-nav-item px-4 py-3 flex items-center">
                  <div className="text-silver">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="fill-current h-6"
                    >
                      <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
                    </svg>
                  </div>
                  <span className="left-nav-label pl-3 text-silver">
                    Free Trial Course
                  </span>
                </div>
              </div>
            </a>
          </li>
          <li
            data-testid="Feats"
            className="pointer whitespace-nowrap hover:bg-charcoal"
          >
            <a href="/feats" target="_self" rel="noreferrer" className="link">
              <div className="flex items-center">
                <div className="left-nav-item px-4 py-3 flex items-center">
                  <div className="text-silver">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="fill-current h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 00-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 00-.552.698 5 5 0 004.503 5.152 6 6 0 002.946 1.822A6.451 6.451 0 017.768 13H7.5A1.5 1.5 0 006 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 00-1.5-1.5h-.268a6.453 6.453 0 01-.684-2.202 6 6 0 002.946-1.822 5 5 0 004.503-5.152.75.75 0 00-.552-.698A31.804 31.804 0 0016 2.562v-.387a.75.75 0 00-.629-.74A33.227 33.227 0 0010 1zM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 01-1.855-2.68zm14.95 0a3.503 3.503 0 01-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="left-nav-label pl-3 text-silver">Feats</span>
                </div>
              </div>
            </a>
          </li>
          <li
            data-testid="Help Hub"
            className="pointer whitespace-nowrap hover:bg-charcoal"
          >
            <a
              href="https://help.bloomtech.com/"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              <div className="flex items-center">
                <div className="left-nav-item px-4 py-3 flex items-center">
                  <div className="text-silver">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="fill-current h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="left-nav-label pl-3 text-silver">
                    Help Hub
                  </span>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <div className="absolute block bottom-0 bg-dark-gray pt-6 mb-1 w-60 h-52">
          <div className="m-auto flex items-center justify-center bg-brand-gradient text-center font-semibold w-48 h-36 text-xl rounded-xl">
            <div className="px-6">
              There are 21 days left in your Free Trial.
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col overflow-auto h-screen" id="page-container">
        <div className="flex flex-col grow ">
          <div className="bg-brand-gradient-linear w-full sticky font-semibold text-salt z-20 py-3 px-4 top-0 text-xl">
            <span>Ready to change your life? </span>
            <a
              className="text-salt underline underline-offset-4 decoration-0 decoration-salt mr-0 cursor-pointer"
              href="/coaching"
              target="_self"
              rel="noreferrer"
            >
              Call or text your Enrollment Coach today
            </a>
            <span>!</span>
          </div>
          <div className="mx-6 md:mx-12 flex justify-between items-center mt-5">
            <div className="ml-auto flex gap-5 items-center z-[10] md:-mr-2">
              <div
                className="MuiChip-root MuiChip-filled MuiChip-sizeSmall MuiChip-colorSecondary MuiChip-filledSecondary css-1qcn6n8"
                aria-label="You are currently in Cohort 24w5. You can learn more on your Profile page."
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="MuiChip-icon MuiChip-iconSmall MuiChip-iconColorSecondary w-4 ml-2"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
                </svg>
                <span className="MuiChip-label MuiChip-labelSmall css-1jdkvty">
                  24w5
                </span>
              </div>
              <button
                type="button"
                id="radix-:R1adu5:"
                aria-haspopup="menu"
                aria-expanded="false"
                data-state="closed"
                className
              >
                <div className="flex gap-3 items-center">
                  <img
                    className="rounded-full"
                    width={20}
                    height={20}
                    src="/assets/images/BIT_LogoIcon_White.svg"
                    alt="Profile Picture"
                  />
                  <span className="relative font-open-sans text-lg undefined">
                    <div className="text-[1rem] leading-normal text-white">
                      anbilarabi .
                    </div>
                  </span>
                </div>
              </button>
            </div>
          </div>
          <div className="grow min-h-0 flex flex-col m-6 md:m-12 mt-0 md:mt-0 relative">
            <div className="absolute z-50 m-0 p-0 card-shadow hidden group-hover:flex group-focus:flex flex-col -top-4 left-[calc(10vw)]">
              <div className="flex p-0 m-0 justify-center">
                <div className="w-0 h-0 m-0 border-[1em] border-transparent border-b-[2em] border-b-boysenberry border-b-[2rem] border-[1.5rem] rotate-0" />
              </div>
              <div className="p-3 font-open-sans font-normal normal-case rounded-xl border border-transparent border-solid shadow-2xl bg-boysenberry w-[30rem]">
                <div
                  id="PORTAL"
                  className="demo m-0 bg-transparent w-full h-full p-5"
                >
                  <div className="h-5 flex justify-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="cursor-pointer h-full"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </div>
                  <div className="content">
                    <div className="opacity-[.5] mb-2">
                      <span>-1</span> of <span>-1</span>
                    </div>
                    <h2 className="relative font-titillium font-semibold text-3xl leading-12 text-[1.3rem] mb-2">
                      Welcome to the Portal
                    </h2>
                    <div className="whitespace-pre-wrap">
                      The Portal is your home base so be sure to bookmark this
                      page! From here, you can access your course, live classes,
                      and your enrollment tasks.{' '}
                    </div>
                    <div className="flex w-full h-[15%] gap-2 mt-6 justify-end" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div>
                <h2 className="MuiTypography-root MuiTypography-h4 mb-3 css-a24p1z">
                  Enroll Today
                </h2>
                <div>
                  <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiAccordion-root MuiAccordion-rounded css-1tpmecz">
                    <div
                      className="MuiButtonBase-root MuiAccordionSummary-root css-1uaukoe"
                      tabIndex={0}
                      role="button"
                      aria-expanded="false"
                    >
                      <div className="MuiAccordionSummary-content css-1n11r91">
                        <div className="w-full flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="MuiButtonBase-root MuiCheckbox-root MuiCheckbox-colorSuccess MuiCheckbox-sizeMedium PrivateSwitchBase-root MuiCheckbox-root MuiCheckbox-colorSuccess MuiCheckbox-sizeMedium MuiCheckbox-root MuiCheckbox-colorSuccess MuiCheckbox-sizeMedium hover:bg-transparent css-1f85jhy">
                              <input
                                className="PrivateSwitchBase-input css-1m9pwf3"
                                readOnly
                                type="checkbox"
                                data-indeterminate="false"
                              />
                              <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="CheckBoxOutlineBlankIcon"
                              >
                                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                              </svg>
                            </span>
                            <h5 className="MuiTypography-root MuiTypography-h5 css-1swsley">
                              Set up your computer
                            </h5>
                          </div>
                          <div className="MuiChip-root MuiChip-filled MuiChip-sizeSmall MuiChip-colorError MuiChip-filledError mr-2 css-9qrquz">
                            <span className="MuiChip-label MuiChip-labelSmall css-1jdkvty">
                              * Required
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="MuiAccordionSummary-expandIconWrapper css-1fx8m19">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-6 text-dark-silver"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-hidden css-a0y2e3"
                      style={{
                        minHeight: '0px',
                        height: '0px',
                        transitionDuration: '380ms',
                      }}
                    >
                      <div className="MuiCollapse-wrapper MuiCollapse-vertical css-hboir5">
                        <div className="MuiCollapse-wrapperInner MuiCollapse-vertical css-8atqhb">
                          <div role="region" className="MuiAccordion-region">
                            <div className="MuiAccordionDetails-root css-j24qc6">
                              <div className="bg-charcoal p-4 rounded-sm mb-4">
                                <div>
                                  <div className="MuiTabs-root mb-3 css-orq8zk">
                                    <div
                                      className="MuiTabs-scroller MuiTabs-fixed css-1anid1y"
                                      style={{
                                        overflow: 'hidden',
                                        marginBottom: 0,
                                      }}
                                    >
                                      <div
                                        className="MuiTabs-flexContainer css-k008qs"
                                        role="tablist"
                                      >
                                        <button
                                          className="MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary Mui-selected css-1ik3ssi"
                                          tabIndex={0}
                                          type="button"
                                          role="tab"
                                          aria-selected="true"
                                        >
                                          Windows
                                        </button>
                                        <button
                                          className="MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary css-1ik3ssi"
                                          tabIndex={-1}
                                          type="button"
                                          role="tab"
                                          aria-selected="false"
                                        >
                                          Mac
                                        </button>
                                      </div>
                                      <span
                                        className="MuiTabs-indicator css-94msxu"
                                        style={{ left: '0px', width: '90px' }}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    <div className="lg:col-span-2 min-h-[175px] md:min-h-[390px]">
                                      <div className="relative h-full w-full">
                                        <div
                                          style={{
                                            margin: '0px auto',
                                            position: 'absolute',
                                            top: '0px',
                                            left: '0px',
                                            width: '100%',
                                            height: '100%',
                                          }}
                                        >
                                          <div
                                            id="wistia-player-h1htq"
                                            className="wistia_embed wistia_async_3i0650g4q8 wistia_embed_initialized"
                                            style={{
                                              width: '100%',
                                              height: '100%',
                                            }}
                                          >
                                            <div
                                              id="wistia_chrome_402"
                                              className="w-chrome notranslate"
                                              tabIndex={-1}
                                              style={{
                                                display: 'inline-block',
                                                height: '390px',
                                                lineHeight: 'normal',
                                                margin: '0px',
                                                padding: '0px',
                                                position: 'relative',
                                                verticalAlign: 'top',
                                                width: '613px',
                                                outline: 'none',
                                                overflow: 'hidden',
                                                boxSizing: 'content-box',
                                                borderRadius: '0px',
                                              }}
                                            >
                                              <div
                                                id="wistia_grid_408_wrapper"
                                                style={{
                                                  display: 'block',
                                                  width: '613px',
                                                  height: '390px',
                                                }}
                                              >
                                                <div
                                                  id="wistia_grid_408_above"
                                                  style={{
                                                    height: '0px',
                                                    fontSize: '0px',
                                                    lineHeight: '0px',
                                                  }}
                                                >
                                                  {' '}
                                                </div>
                                                <div
                                                  id="wistia_grid_408_main"
                                                  style={{
                                                    width: '613px',
                                                    left: '0px',
                                                    height: '390px',
                                                    marginTop: '0px',
                                                  }}
                                                >
                                                  <div id="wistia_grid_408_behind" />
                                                  <div
                                                    id="wistia_grid_408_center"
                                                    style={{
                                                      width: '100%',
                                                      height: '100%',
                                                    }}
                                                  >
                                                    <div
                                                      className="w-video-wrapper w-css-reset"
                                                      style={{
                                                        height: '100%',
                                                        position: 'absolute',
                                                        top: '0px',
                                                        width: '100%',
                                                        opacity: 1,
                                                        backgroundColor:
                                                          'rgb(0, 0, 0)',
                                                      }}
                                                    >
                                                      <video
                                                        id="wistia_simple_video_433"
                                                        crossOrigin="anonymous"
                                                        poster="https://fast.wistia.com/assets/images/blank.gif"
                                                        aria-label="Video"
                                                        src="blob:https://app.bloomtech.com/7adcfaea-87ad-41c3-badd-da7070d9406a"
                                                        controlslist="nodownload"
                                                        playsInline
                                                        preload="metadata"
                                                        type="video/m3u8"
                                                        x-webkit-airplay="allow"
                                                        style={{
                                                          background:
                                                            'transparent',
                                                          display: 'block',
                                                          height: '100%',
                                                          maxHeight: 'none',
                                                          maxWidth: 'none',
                                                          position: 'static',
                                                          visibility: 'visible',
                                                          width: '100%',
                                                          objectFit: 'contain',
                                                        }}
                                                      />
                                                    </div>
                                                    <div
                                                      className="w-ui-container"
                                                      style={{
                                                        height: '100%',
                                                        left: '0px',
                                                        position: 'absolute',
                                                        top: '0px',
                                                        width: '100%',
                                                        opacity: 1,
                                                      }}
                                                    >
                                                      <div
                                                        className="w-vulcan-v2 w-css-reset"
                                                        id="w-vulcan-v2-407"
                                                        style={{
                                                          borderRadius: '0px',
                                                          boxSizing:
                                                            'border-box',
                                                          cursor: 'default',
                                                          direction: 'ltr',
                                                          height: '100%',
                                                          left: '0px',
                                                          position: 'absolute',
                                                          visibility: 'visible',
                                                          top: '0px',
                                                          width: '100%',
                                                        }}
                                                      >
                                                        <div
                                                          className="w-vulcan--background w-css-reset"
                                                          style={{
                                                            height: '100%',
                                                            left: '0px',
                                                            position:
                                                              'absolute',
                                                            top: '0px',
                                                            width: '100%',
                                                          }}
                                                        >
                                                          <div
                                                            className="w-css-reset"
                                                            data-handle="statusBar"
                                                          />
                                                          <div
                                                            className="w-css-reset"
                                                            data-handle="backgroundFocus"
                                                          >
                                                            <button
                                                              aria-label="Play Video: [Win Env Setup] Chrome, VSCode & code"
                                                              className="w-css-reset w-vulcan-v2-button"
                                                              tabIndex={0}
                                                              style={{
                                                                width: '0px',
                                                                height: '0px',
                                                                pointerEvents:
                                                                  'none',
                                                              }}
                                                            />
                                                          </div>
                                                          <div
                                                            className="w-css-reset"
                                                            data-handle="thumbnail"
                                                          >
                                                            <div>
                                                              <div
                                                                className="w-css-reset"
                                                                style={{
                                                                  height:
                                                                    '100%',
                                                                  left: '0px',
                                                                  opacity: 1,
                                                                  position:
                                                                    'absolute',
                                                                  top: '0px',
                                                                  width: '100%',
                                                                  display:
                                                                    'block',
                                                                }}
                                                              >
                                                                <img
                                                                  className="w-css-reset"
                                                                  srcSet="https://embed-ssl.wistia.com/deliveries/126c48553adcb665b8e823bf90ca25a4.webp?image_crop_resized=640x360 320w, https://embed-ssl.wistia.com/deliveries/126c48553adcb665b8e823bf90ca25a4.webp?image_crop_resized=640x360 640w, https://embed-ssl.wistia.com/deliveries/126c48553adcb665b8e823bf90ca25a4.webp?image_crop_resized=960x540 960w, https://embed-ssl.wistia.com/deliveries/126c48553adcb665b8e823bf90ca25a4.webp?image_crop_resized=1280x720 1280w, https://embed-ssl.wistia.com/deliveries/126c48553adcb665b8e823bf90ca25a4.webp?image_crop_resized=1920x1080 1920w, https://embed-ssl.wistia.com/deliveries/126c48553adcb665b8e823bf90ca25a4.webp?image_crop_resized=1920x1080 3840w"
                                                                  src="https://embed-ssl.wistia.com/deliveries/126c48553adcb665b8e823bf90ca25a4.webp?image_crop_resized=1280x720"
                                                                  alt="windows installation of vscode and chrome"
                                                                  style={{
                                                                    height:
                                                                      '344px',
                                                                    left: '0px',
                                                                    position:
                                                                      'absolute',
                                                                    top: '0px',
                                                                    width:
                                                                      '613px',
                                                                    clip: 'auto',
                                                                    display:
                                                                      'block',
                                                                    borderRadius:
                                                                      '0px',
                                                                    borderWidth:
                                                                      '23px 0px',
                                                                    borderStyle:
                                                                      'solid',
                                                                    borderColor:
                                                                      'rgb(0, 0, 0)',
                                                                    boxSizing:
                                                                      'content-box',
                                                                  }}
                                                                />
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div
                                                          aria-live="polite"
                                                          className="w-vulcan--aria-live w-css-reset"
                                                          aria-atomic="true"
                                                          style={{
                                                            position:
                                                              'absolute',
                                                            left: '-99999em',
                                                          }}
                                                        />
                                                        <div
                                                          className="w-vulcan-overlays-table w-css-reset"
                                                          style={{
                                                            display: 'table',
                                                            pointerEvents:
                                                              'none',
                                                            position:
                                                              'absolute',
                                                            width: '100%',
                                                          }}
                                                        >
                                                          <div
                                                            className="w-vulcan-overlays--left w-css-reset"
                                                            style={{
                                                              display:
                                                                'table-cell',
                                                              verticalAlign:
                                                                'top',
                                                              position:
                                                                'relative',
                                                              width: '0px',
                                                            }}
                                                          >
                                                            <div
                                                              className="w-css-reset"
                                                              style={{
                                                                height: '357px',
                                                              }}
                                                            />
                                                          </div>
                                                          <div
                                                            className="w-vulcan-overlays--center w-css-reset"
                                                            style={{
                                                              display:
                                                                'table-cell',
                                                              verticalAlign:
                                                                'top',
                                                              position:
                                                                'relative',
                                                              width: '100%',
                                                            }}
                                                          >
                                                            <div
                                                              className="w-css-reset"
                                                              style={{
                                                                height: '357px',
                                                              }}
                                                            >
                                                              <div
                                                                className="w-css-reset"
                                                                data-handle="bigPlayButton"
                                                                style={{
                                                                  pointerEvents:
                                                                    'auto',
                                                                }}
                                                              >
                                                                <div
                                                                  className="w-bpb-wrapper w-css-reset w-css-reset-tree"
                                                                  style={{
                                                                    borderRadius:
                                                                      '0px',
                                                                    display:
                                                                      'block',
                                                                    left: 'calc(50%)',
                                                                    marginLeft:
                                                                      '-59.8633px',
                                                                    marginTop:
                                                                      '-38.3125px',
                                                                    overflow:
                                                                      'hidden',
                                                                    position:
                                                                      'absolute',
                                                                    top: 'calc(50% + 0px)',
                                                                  }}
                                                                >
                                                                  <button
                                                                    className="w-big-play-button w-css-reset-button-important w-vulcan-v2-button"
                                                                    aria-label="Play Video: [Win Env Setup] Chrome, VSCode & code"
                                                                    tabIndex={0}
                                                                    type="button"
                                                                    style={{
                                                                      cursor:
                                                                        'pointer',
                                                                      height:
                                                                        '76.625px',
                                                                      boxShadow:
                                                                        'none',
                                                                      width:
                                                                        '119.727px',
                                                                    }}
                                                                  >
                                                                    <div
                                                                      style={{
                                                                        background:
                                                                          'rgb(62, 69, 242)',
                                                                        display:
                                                                          'block',
                                                                        left: '0px',
                                                                        height:
                                                                          '76.625px',
                                                                        mixBlendMode:
                                                                          'darken',
                                                                        position:
                                                                          'absolute',
                                                                        top: '0px',
                                                                        width:
                                                                          '119.727px',
                                                                      }}
                                                                    />
                                                                    <div
                                                                      style={{
                                                                        backgroundColor:
                                                                          'rgba(62, 69, 242, 0.7)',
                                                                        height:
                                                                          '76.625px',
                                                                        left: '0px',
                                                                        position:
                                                                          'absolute',
                                                                        top: '0px',
                                                                        transition:
                                                                          'background-color 150ms ease 0s',
                                                                        width:
                                                                          '119.727px',
                                                                      }}
                                                                    />
                                                                    <svg
                                                                      x="0px"
                                                                      y="0px"
                                                                      viewBox="0 0 125 80"
                                                                      enableBackground="new 0 0 125 80"
                                                                      aria-hidden="true"
                                                                      alt=""
                                                                      style={{
                                                                        fill: 'rgb(255, 255, 255)',
                                                                        height:
                                                                          '76.625px',
                                                                        left: '0px',
                                                                        strokeWidth:
                                                                          '0px',
                                                                        top: '0px',
                                                                        width:
                                                                          '100%',
                                                                        position:
                                                                          'absolute',
                                                                      }}
                                                                    >
                                                                      <rect
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        fill="none"
                                                                        width={
                                                                          125
                                                                        }
                                                                        height={
                                                                          80
                                                                        }
                                                                      />
                                                                      <polygon
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        fill="#FFFFFF"
                                                                        points="53,22 53,58 79,40"
                                                                      />
                                                                    </svg>
                                                                  </button>
                                                                </div>
                                                              </div>
                                                              <div
                                                                className="w-css-reset"
                                                                data-handle="clickForSoundButton"
                                                                style={{
                                                                  pointerEvents:
                                                                    'auto',
                                                                }}
                                                              >
                                                                <div
                                                                  className="w-css-reset w-css-reset-tree"
                                                                  data-handle="click-for-sound-backdrop"
                                                                  style={{
                                                                    display:
                                                                      'none',
                                                                    height:
                                                                      '100%',
                                                                    left: '0px',
                                                                    pointerEvents:
                                                                      'auto',
                                                                    position:
                                                                      'absolute',
                                                                    top: '0px',
                                                                    width:
                                                                      '100%',
                                                                  }}
                                                                >
                                                                  <button
                                                                    aria-label="Click for sound"
                                                                    className="w-vulcan-v2-button click-for-sound-btn"
                                                                    style={{
                                                                      background:
                                                                        'rgba(0, 0, 0, 0.8)',
                                                                      border:
                                                                        '2px solid transparent',
                                                                      borderRadius:
                                                                        '60px',
                                                                      cursor:
                                                                        'pointer',
                                                                      display:
                                                                        'flex',
                                                                      justifyContent:
                                                                        'space-between',
                                                                      alignItems:
                                                                        'center',
                                                                      outline:
                                                                        'none',
                                                                      pointerEvents:
                                                                        'auto',
                                                                      position:
                                                                        'absolute',
                                                                      right:
                                                                        '19.5508px',
                                                                      top: '19.5508px',
                                                                      maxWidth:
                                                                        '573.898px',
                                                                    }}
                                                                  >
                                                                    <div
                                                                      style={{
                                                                        display:
                                                                          'flex',
                                                                        alignItems:
                                                                          'center',
                                                                        justifyContent:
                                                                          'flex-end',
                                                                        whiteSpace:
                                                                          'nowrap',
                                                                        overflow:
                                                                          'hidden',
                                                                        maxWidth:
                                                                          '0px',
                                                                        transition:
                                                                          'max-width 200ms ease 0s',
                                                                      }}
                                                                    >
                                                                      <span
                                                                        style={{
                                                                          color:
                                                                            'rgb(255, 255, 255)',
                                                                          fontFamily:
                                                                            'WistiaPlayerInter, Helvetica, sans-serif',
                                                                          fontSize:
                                                                            '15px',
                                                                          fontWeight: 500,
                                                                          paddingLeft:
                                                                            '1em',
                                                                          whiteSpace:
                                                                            'nowrap',
                                                                          overflow:
                                                                            'hidden',
                                                                          textOverflow:
                                                                            'ellipsis',
                                                                          maxWidth:
                                                                            '613px',
                                                                        }}
                                                                      >
                                                                        Click
                                                                        for
                                                                        sound
                                                                      </span>
                                                                    </div>
                                                                    <svg
                                                                      viewBox="0 0 237 237"
                                                                      width="50.28515624999999"
                                                                      height="50.28515624999999"
                                                                    >
                                                                      <style
                                                                        dangerouslySetInnerHTML={{
                                                                          __html:
                                                                            '\n  @keyframes VOLUME_SMALL_WAVE_FLASH {\n    0% { opacity: 0; }\n    33% { opacity: 1; }\n    66% { opacity: 1; }\n    100% { opacity: 0; }\n  }\n\n  @keyframes VOLUME_LARGE_WAVE_FLASH {\n    0% { opacity: 0; }\n    33% { opacity: 1; }\n    66% { opacity: 1; }\n    100% { opacity: 0; }\n  }\n\n  .volume__small-wave {\n    animation: VOLUME_SMALL_WAVE_FLASH 2s infinite;\n    opacity: 0;\n  }\n\n  .volume__large-wave {\n    animation: VOLUME_LARGE_WAVE_FLASH 2s infinite .3s;\n    opacity: 0;\n  }\n',
                                                                        }}
                                                                      />
                                                                      <path
                                                                        fill="#fff"
                                                                        d="M88 107H65v24h24l23 23V84z"
                                                                      />
                                                                      <g
                                                                        fill="none"
                                                                        stroke="#fff"
                                                                        strokeLinecap="round"
                                                                        strokeWidth={
                                                                          10
                                                                        }
                                                                      >
                                                                        <path
                                                                          d="M142 86c9 21 9 44 0 65"
                                                                          className="volume__small-wave"
                                                                        />
                                                                        <path
                                                                          d="M165 74c13 23 13 66 0 89"
                                                                          className="volume__large-wave"
                                                                        />
                                                                      </g>
                                                                    </svg>
                                                                  </button>
                                                                </div>
                                                              </div>
                                                              <div
                                                                className="w-css-reset"
                                                                data-handle="playPauseNotifier"
                                                                style={{
                                                                  pointerEvents:
                                                                    'auto',
                                                                }}
                                                              >
                                                                <div
                                                                  className="w-play-pause-notifier"
                                                                  style={{
                                                                    background:
                                                                      'rgba(0, 0, 0, 0.6)',
                                                                    borderRadius:
                                                                      '50%',
                                                                    height:
                                                                      '134.094px',
                                                                    left: '50%',
                                                                    pointerEvents:
                                                                      'none',
                                                                    position:
                                                                      'absolute',
                                                                    opacity: 0,
                                                                    top: '50%',
                                                                    transform:
                                                                      'translate(-50%, -50%) scale(0.8)',
                                                                    transition:
                                                                      'opacity 0.8s ease 0s, transform 0.8s ease 0s',
                                                                    width:
                                                                      '134.094px',
                                                                  }}
                                                                >
                                                                  <div
                                                                    style={{
                                                                      height:
                                                                        '76.625px',
                                                                      left: '50%',
                                                                      pointerEvents:
                                                                        'none',
                                                                      position:
                                                                        'absolute',
                                                                      top: '50%',
                                                                      transform:
                                                                        'translate(-50%, -50%)',
                                                                      width:
                                                                        '47.8906px',
                                                                    }}
                                                                  >
                                                                    <div
                                                                      style={{
                                                                        height:
                                                                          '100%',
                                                                        width:
                                                                          '100%',
                                                                      }}
                                                                    >
                                                                      <div
                                                                        style={{
                                                                          display:
                                                                            'block',
                                                                          height:
                                                                            '100%',
                                                                          width:
                                                                            '100%',
                                                                        }}
                                                                      >
                                                                        <svg
                                                                          x="0px"
                                                                          y="0px"
                                                                          viewBox="0 0 10 12"
                                                                          enableBackground="new 0 0 10 12"
                                                                          aria-hidden="true"
                                                                          className="w-css-reset w-css-reset-tree"
                                                                          style={{
                                                                            fill: 'rgb(255, 255, 255)',
                                                                            height:
                                                                              '100%',
                                                                            left: '0px',
                                                                            strokeWidth:
                                                                              '0px',
                                                                            top: '0px',
                                                                            width:
                                                                              '100%',
                                                                          }}
                                                                        >
                                                                          <g>
                                                                            <rect
                                                                              x={
                                                                                0
                                                                              }
                                                                              y={
                                                                                0
                                                                              }
                                                                              width="3.5"
                                                                              height={
                                                                                12
                                                                              }
                                                                            />
                                                                            <rect
                                                                              x="6.5"
                                                                              y={
                                                                                0
                                                                              }
                                                                              width="3.5"
                                                                              height={
                                                                                12
                                                                              }
                                                                            />
                                                                          </g>
                                                                        </svg>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          display:
                                                                            'none',
                                                                          height:
                                                                            '100%',
                                                                          width:
                                                                            '100%',
                                                                        }}
                                                                      >
                                                                        <svg
                                                                          x="0px"
                                                                          y="0px"
                                                                          viewBox="0 0 10 12"
                                                                          enableBackground="new 0 0 10 12"
                                                                          aria-hidden="true"
                                                                          className="w-css-reset w-css-reset-tree"
                                                                          style={{
                                                                            fill: 'rgb(255, 255, 255)',
                                                                            height:
                                                                              '100%',
                                                                            left: '0px',
                                                                            strokeWidth:
                                                                              '0px',
                                                                            top: '0px',
                                                                            width:
                                                                              '100%',
                                                                          }}
                                                                        >
                                                                          <polygon points="11.556,7.5 0,15 0,0" />
                                                                        </svg>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div
                                                                className="w-css-reset"
                                                                data-handle="captions"
                                                                style={{
                                                                  pointerEvents:
                                                                    'auto',
                                                                }}
                                                              >
                                                                <nothing />
                                                              </div>
                                                              <div
                                                                className="w-css-reset"
                                                                data-handle="playPauseLoading"
                                                                style={{
                                                                  pointerEvents:
                                                                    'auto',
                                                                }}
                                                              >
                                                                <div
                                                                  className="w-css-reset w-css-reset-tree"
                                                                  style={{
                                                                    height:
                                                                      '100%',
                                                                    left: '0px',
                                                                    pointerEvents:
                                                                      'none',
                                                                    position:
                                                                      'absolute',
                                                                    top: '0px',
                                                                    width:
                                                                      '100%',
                                                                  }}
                                                                >
                                                                  <button
                                                                    aria-label="Play Video"
                                                                    className="w-vulcan-v2-button"
                                                                    style={{
                                                                      background:
                                                                        'rgba(0, 0, 0, 0.6)',
                                                                      border:
                                                                        '0px',
                                                                      borderRadius:
                                                                        '50%',
                                                                      cursor:
                                                                        'pointer',
                                                                      display:
                                                                        'none',
                                                                      height:
                                                                        '134.094px',
                                                                      left: '50%',
                                                                      margin:
                                                                        '0px',
                                                                      padding:
                                                                        '0px',
                                                                      pointerEvents:
                                                                        'auto',
                                                                      position:
                                                                        'absolute',
                                                                      opacity: 0,
                                                                      outline:
                                                                        'none',
                                                                      top: '50%',
                                                                      transform:
                                                                        'translate(-50%, -50%) scale(0.8)',
                                                                      transition:
                                                                        'opacity 200ms ease 0s, transform 600ms ease 0s',
                                                                      WebkitTapHighlightColor:
                                                                        'rgba(0, 0, 0, 0)',
                                                                      width:
                                                                        '134.094px',
                                                                    }}
                                                                  >
                                                                    <div
                                                                      style={{
                                                                        boxSizing:
                                                                          'border-box',
                                                                        height:
                                                                          '100%',
                                                                        padding:
                                                                          '45.2566px 45.2566px 45.2566px 55.3137px',
                                                                      }}
                                                                    >
                                                                      <div
                                                                        style={{
                                                                          height:
                                                                            '100%',
                                                                          width:
                                                                            '100%',
                                                                        }}
                                                                      >
                                                                        <div
                                                                          style={{
                                                                            display:
                                                                              'none',
                                                                            height:
                                                                              '100%',
                                                                            width:
                                                                              '100%',
                                                                          }}
                                                                        >
                                                                          <svg
                                                                            x="0px"
                                                                            y="0px"
                                                                            viewBox="0 0 11.556 16"
                                                                            enableBackground="new 0 0 11.556 16"
                                                                            aria-hidden="true"
                                                                            className="w-css-reset w-css-reset-tree"
                                                                            style={{
                                                                              fill: 'rgb(255, 255, 255)',
                                                                              height:
                                                                                '100%',
                                                                              left: '0px',
                                                                              strokeWidth:
                                                                                '0px',
                                                                              top: '0px',
                                                                              width:
                                                                                '100%',
                                                                            }}
                                                                          >
                                                                            <g>
                                                                              <rect
                                                                                x={
                                                                                  0
                                                                                }
                                                                                y={
                                                                                  0
                                                                                }
                                                                                width="3.5"
                                                                                height={
                                                                                  12
                                                                                }
                                                                              />
                                                                              <rect
                                                                                x="6.5"
                                                                                y={
                                                                                  0
                                                                                }
                                                                                width="3.5"
                                                                                height={
                                                                                  12
                                                                                }
                                                                              />
                                                                            </g>
                                                                          </svg>
                                                                        </div>
                                                                        <div
                                                                          style={{
                                                                            display:
                                                                              'block',
                                                                            height:
                                                                              '100%',
                                                                            width:
                                                                              '100%',
                                                                          }}
                                                                        >
                                                                          <svg
                                                                            x="0px"
                                                                            y="0px"
                                                                            viewBox="0 0 11.556 16"
                                                                            enableBackground="new 0 0 11.556 16"
                                                                            aria-hidden="true"
                                                                            className="w-css-reset w-css-reset-tree"
                                                                            style={{
                                                                              fill: 'rgb(255, 255, 255)',
                                                                              height:
                                                                                '100%',
                                                                              left: '0px',
                                                                              strokeWidth:
                                                                                '0px',
                                                                              top: '0px',
                                                                              width:
                                                                                '100%',
                                                                            }}
                                                                          >
                                                                            <polygon points="11.556,7.5 0,15 0,0" />
                                                                          </svg>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </button>
                                                                </div>
                                                              </div>
                                                              <div
                                                                className="w-css-reset"
                                                                data-handle="annotationOverlay"
                                                                style={{
                                                                  pointerEvents:
                                                                    'auto',
                                                                }}
                                                              >
                                                                <div>
                                                                  <div
                                                                    style={{
                                                                      position:
                                                                        'absolute',
                                                                      display:
                                                                        'flex',
                                                                      flexDirection:
                                                                        'column',
                                                                      pointerEvents:
                                                                        'none',
                                                                      maxWidth:
                                                                        '50%',
                                                                      width:
                                                                        '100%',
                                                                      alignItems:
                                                                        'flex-start',
                                                                    }}
                                                                  />
                                                                  <div
                                                                    style={{
                                                                      position:
                                                                        'absolute',
                                                                      display:
                                                                        'flex',
                                                                      flexDirection:
                                                                        'column',
                                                                      pointerEvents:
                                                                        'none',
                                                                      maxWidth:
                                                                        '50%',
                                                                      width:
                                                                        '100%',
                                                                      right:
                                                                        '0px',
                                                                      alignItems:
                                                                        'flex-end',
                                                                      marginTop:
                                                                        '0px',
                                                                    }}
                                                                  />
                                                                </div>
                                                              </div>
                                                              <div
                                                                className="w-css-reset"
                                                                data-handle="transcript"
                                                                style={{
                                                                  pointerEvents:
                                                                    'auto',
                                                                }}
                                                              >
                                                                <div
                                                                  className="w-css-reset"
                                                                  style={{
                                                                    position:
                                                                      'absolute',
                                                                  }}
                                                                />
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div
                                                            className="w-vulcan-overlays--right w-css-reset"
                                                            style={{
                                                              display:
                                                                'table-cell',
                                                              verticalAlign:
                                                                'top',
                                                              position:
                                                                'relative',
                                                              width: '0px',
                                                            }}
                                                          >
                                                            <div
                                                              className="w-css-reset"
                                                              style={{
                                                                height: '357px',
                                                              }}
                                                            />
                                                          </div>
                                                        </div>
                                                        <div
                                                          className="w-bottom-bar w-css-reset"
                                                          style={{
                                                            bottom: '0px',
                                                            borderRadius: '0px',
                                                            borderCollapse:
                                                              'collapse',
                                                            display: 'table',
                                                            height: '33px',
                                                            pointerEvents:
                                                              'none',
                                                            position:
                                                              'absolute',
                                                            paddingLeft: '0px',
                                                            paddingRight: '0px',
                                                            right: '0px',
                                                            tableLayout: 'auto',
                                                            transform: 'unset',
                                                            width:
                                                              'calc(100% + 0px)',
                                                          }}
                                                        >
                                                          <div
                                                            className="w-bottom-bar-lower w-css-reset"
                                                            style={{
                                                              position:
                                                                'relative',
                                                            }}
                                                          >
                                                            <div
                                                              style={{
                                                                height: '100%',
                                                                left: '0px',
                                                                position:
                                                                  'absolute',
                                                                top: '0px',
                                                                width: '100%',
                                                              }}
                                                            >
                                                              <div
                                                                style={{
                                                                  background:
                                                                    'rgb(62, 69, 242)',
                                                                  display:
                                                                    'none',
                                                                  height:
                                                                    '100%',
                                                                  mixBlendMode:
                                                                    'darken',
                                                                  left: '0px',
                                                                  opacity: 1,
                                                                  position:
                                                                    'absolute',
                                                                  top: '0px',
                                                                  transition:
                                                                    'opacity 0s ease 0s',
                                                                  width: '100%',
                                                                }}
                                                              />
                                                              <div
                                                                style={{
                                                                  background:
                                                                    'rgba(62, 69, 242, 0.85)',
                                                                  borderRadius:
                                                                    '0px',
                                                                  height:
                                                                    '100%',
                                                                  opacity: 1,
                                                                  left: '0px',
                                                                  position:
                                                                    'absolute',
                                                                  top: '0px',
                                                                  transition:
                                                                    'opacity 0s ease 0s',
                                                                  width: '100%',
                                                                }}
                                                              />
                                                            </div>
                                                            <div
                                                              style={{
                                                                display: 'none',
                                                              }}
                                                            >
                                                              <div
                                                                style={{
                                                                  background:
                                                                    'rgb(62, 69, 242)',
                                                                  display:
                                                                    'none',
                                                                  height:
                                                                    '100%',
                                                                  mixBlendMode:
                                                                    'darken',
                                                                  left: '0px',
                                                                  opacity: 1,
                                                                  position:
                                                                    'absolute',
                                                                  top: '0px',
                                                                  transition:
                                                                    'opacity 0s ease 0s',
                                                                  width: '100%',
                                                                }}
                                                              />
                                                              <div
                                                                style={{
                                                                  background:
                                                                    'rgba(62, 69, 242, 0.85)',
                                                                  borderRadius:
                                                                    '0px',
                                                                  height:
                                                                    '100%',
                                                                  opacity: 1,
                                                                  left: '0px',
                                                                  position:
                                                                    'absolute',
                                                                  top: '0px',
                                                                  transition:
                                                                    'opacity 0s ease 0s',
                                                                  width: '100%',
                                                                }}
                                                              />
                                                            </div>
                                                            <div
                                                              className="w-bottom-bar-left w-css-reset"
                                                              style={{
                                                                display:
                                                                  'table-cell',
                                                                verticalAlign:
                                                                  'top',
                                                                position:
                                                                  'relative',
                                                                width: '0px',
                                                                opacity: 1,
                                                                transition:
                                                                  'opacity 0s ease 0s',
                                                              }}
                                                            >
                                                              <div
                                                                className="w-bottom-bar-left-inner w-css-reset"
                                                                style={{
                                                                  height:
                                                                    '33px',
                                                                  position:
                                                                    'relative',
                                                                  pointerEvents:
                                                                    'auto',
                                                                  whiteSpace:
                                                                    'nowrap',
                                                                }}
                                                              >
                                                                <div
                                                                  className="w-css-reset"
                                                                  data-handle="smallPlayButton"
                                                                  style={{
                                                                    display:
                                                                      'inline-block',
                                                                    verticalAlign:
                                                                      'top',
                                                                  }}
                                                                >
                                                                  <div
                                                                    className="w-vulcan-button-wrapper w-css-reset"
                                                                    style={{
                                                                      display:
                                                                        'inline-block',
                                                                      height:
                                                                        '33px',
                                                                      position:
                                                                        'relative',
                                                                      verticalAlign:
                                                                        'top',
                                                                      width:
                                                                        '38.3125px',
                                                                    }}
                                                                  >
                                                                    <button
                                                                      className="w-vulcan-v2-button w-css-reset w-css-reset-tree w-css-reset-button-important"
                                                                      tabIndex={
                                                                        0
                                                                      }
                                                                      aria-label="Play Video"
                                                                      title="Play Video"
                                                                      style={{
                                                                        backgroundColor:
                                                                          'rgba(0, 0, 0, 0)',
                                                                        borderRadius:
                                                                          '0px',
                                                                        boxShadow:
                                                                          'none',
                                                                        cursor:
                                                                          'pointer',
                                                                        height:
                                                                          '100%',
                                                                        position:
                                                                          'relative',
                                                                        transition:
                                                                          'background-color 150ms ease 0s',
                                                                        width:
                                                                          'calc(100% + 0px)',
                                                                        paddingRight:
                                                                          '0px',
                                                                      }}
                                                                    >
                                                                      <div
                                                                        className="w-vulcan-icon-wrapper"
                                                                        data-handle="smallPlayButton_icon_wrapper"
                                                                        style={{
                                                                          boxSizing:
                                                                            'border-box',
                                                                          height:
                                                                            '100%',
                                                                          position:
                                                                            'relative',
                                                                          opacity: 1,
                                                                          transform:
                                                                            'scale(1.001)',
                                                                          transition:
                                                                            'transform 200ms ease 0s',
                                                                        }}
                                                                      >
                                                                        <div
                                                                          style={{
                                                                            boxSizing:
                                                                              'border-box',
                                                                            height:
                                                                              '100%',
                                                                            marginLeft:
                                                                              '0.957813px',
                                                                            padding:
                                                                              '9.57812px 0px 8.62031px',
                                                                            position:
                                                                              'relative',
                                                                            width:
                                                                              '100%',
                                                                          }}
                                                                        >
                                                                          <div
                                                                            style={{
                                                                              height:
                                                                                '100%',
                                                                              width:
                                                                                '100%',
                                                                            }}
                                                                          >
                                                                            <div
                                                                              style={{
                                                                                display:
                                                                                  'none',
                                                                                height:
                                                                                  '100%',
                                                                                width:
                                                                                  '100%',
                                                                              }}
                                                                            >
                                                                              <svg
                                                                                x="0px"
                                                                                y="0px"
                                                                                viewBox="0 0 11.556 16"
                                                                                enableBackground="new 0 0 11.556 16"
                                                                                aria-hidden="true"
                                                                                className="w-css-reset w-css-reset-tree"
                                                                                style={{
                                                                                  fill: 'rgb(255, 255, 255)',
                                                                                  height:
                                                                                    '100%',
                                                                                  left: '0px',
                                                                                  strokeWidth:
                                                                                    '0px',
                                                                                  top: '0px',
                                                                                  width:
                                                                                    '100%',
                                                                                  verticalAlign:
                                                                                    'top',
                                                                                }}
                                                                              >
                                                                                <g>
                                                                                  <rect
                                                                                    x={
                                                                                      0
                                                                                    }
                                                                                    y={
                                                                                      0
                                                                                    }
                                                                                    width="3.5"
                                                                                    height={
                                                                                      12
                                                                                    }
                                                                                  />
                                                                                  <rect
                                                                                    x="6.5"
                                                                                    y={
                                                                                      0
                                                                                    }
                                                                                    width="3.5"
                                                                                    height={
                                                                                      12
                                                                                    }
                                                                                  />
                                                                                </g>
                                                                              </svg>
                                                                            </div>
                                                                            <div
                                                                              style={{
                                                                                display:
                                                                                  'block',
                                                                                height:
                                                                                  '100%',
                                                                                width:
                                                                                  '100%',
                                                                              }}
                                                                            >
                                                                              <svg
                                                                                x="0px"
                                                                                y="0px"
                                                                                viewBox="0 0 11.556 16"
                                                                                enableBackground="new 0 0 11.556 16"
                                                                                aria-hidden="true"
                                                                                className="w-css-reset w-css-reset-tree"
                                                                                style={{
                                                                                  fill: 'rgb(255, 255, 255)',
                                                                                  height:
                                                                                    '100%',
                                                                                  left: '0px',
                                                                                  strokeWidth:
                                                                                    '0px',
                                                                                  top: '0px',
                                                                                  width:
                                                                                    '100%',
                                                                                  verticalAlign:
                                                                                    'top',
                                                                                }}
                                                                              >
                                                                                <polygon points="11.556,7.5 0,15 0,0" />
                                                                              </svg>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </button>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div
                                                              className="w-bottom-bar-middle w-css-reset"
                                                              style={{
                                                                display:
                                                                  'table-cell',
                                                                verticalAlign:
                                                                  'top',
                                                                position:
                                                                  'relative',
                                                                width: '100%',
                                                                opacity: 1,
                                                                transition:
                                                                  'opacity 0s ease 0s',
                                                              }}
                                                            >
                                                              <div
                                                                className="w-bottom-bar-middle-inner w-css-reset"
                                                                style={{
                                                                  height:
                                                                    '33px',
                                                                  position:
                                                                    'relative',
                                                                  pointerEvents:
                                                                    'auto',
                                                                  whiteSpace:
                                                                    'nowrap',
                                                                  opacity: 1,
                                                                  transform:
                                                                    'translateY(0px)',
                                                                  transition:
                                                                    'opacity 0ms ease 0s, transform 0ms ease 0s',
                                                                }}
                                                              >
                                                                <div
                                                                  className="w-css-reset"
                                                                  data-handle="playbar"
                                                                  style={{
                                                                    height:
                                                                      '100%',
                                                                    position:
                                                                      'relative',
                                                                  }}
                                                                >
                                                                  <div
                                                                    className="w-playbar-wrapper w-css-reset w-css-reset-tree"
                                                                    style={{
                                                                      display:
                                                                        'flex',
                                                                      height:
                                                                        '100%',
                                                                      width:
                                                                        '100%',
                                                                    }}
                                                                  >
                                                                    <div
                                                                      className="w-playbar__time"
                                                                      style={{
                                                                        boxSizing:
                                                                          'content-box',
                                                                        color:
                                                                          'white',
                                                                        fontFamily:
                                                                          'WistiaPlayerInterNumbersSemiBold, Helvetica, sans-serif',
                                                                        fontSize:
                                                                          '12.4516px',
                                                                        letterSpacing:
                                                                          '0.478906px',
                                                                        lineHeight:
                                                                          '33px',
                                                                        paddingLeft:
                                                                          '4.78906px',
                                                                        pointerEvents:
                                                                          'none',
                                                                        position:
                                                                          'relative',
                                                                        textAlign:
                                                                          'center',
                                                                        width:
                                                                          '26.8187px',
                                                                      }}
                                                                    >
                                                                      2:54
                                                                    </div>
                                                                    <div
                                                                      aria-label="Playbar"
                                                                      aria-orientation="horizontal"
                                                                      aria-valuemax="173.534"
                                                                      aria-valuemin={
                                                                        0
                                                                      }
                                                                      aria-valuenow={
                                                                        0
                                                                      }
                                                                      aria-valuetext="0 seconds"
                                                                      role="slider"
                                                                      tabIndex={
                                                                        0
                                                                      }
                                                                      style={{
                                                                        cursor:
                                                                          'pointer',
                                                                        flex: '1 1 0%',
                                                                        height:
                                                                          '33px',
                                                                        outline:
                                                                          'none',
                                                                        marginLeft:
                                                                          '14.3672px',
                                                                        marginRight:
                                                                          '9.57812px',
                                                                        position:
                                                                          'relative',
                                                                      }}
                                                                    >
                                                                      <canvas
                                                                        height={
                                                                          66
                                                                        }
                                                                        width="703.034375"
                                                                        style={{
                                                                          height:
                                                                            '33px',
                                                                          left: '-14.3672px',
                                                                          position:
                                                                            'absolute',
                                                                          top: '0px',
                                                                          width:
                                                                            '351.517px',
                                                                        }}
                                                                      />
                                                                      <div
                                                                        style={{
                                                                          borderRadius:
                                                                            '50%',
                                                                          height:
                                                                            '10.7275px',
                                                                          left: '-5.36375px',
                                                                          opacity: 0,
                                                                          position:
                                                                            'absolute',
                                                                          top: '11.1363px',
                                                                          width:
                                                                            '10.7275px',
                                                                        }}
                                                                      />
                                                                      <div
                                                                        aria-label="Chapter Markers"
                                                                        aria-orientation="horizontal"
                                                                        className="w-playbar__chapter-markers w-css-reset w-css-reset-tree"
                                                                        role="toolbar"
                                                                        tabIndex={
                                                                          0
                                                                        }
                                                                        style={{
                                                                          height:
                                                                            '100%',
                                                                          left: '0px',
                                                                          pointerEvents:
                                                                            'none',
                                                                          position:
                                                                            'absolute',
                                                                          top: '0px',
                                                                          width:
                                                                            '100%',
                                                                        }}
                                                                      >
                                                                        <button
                                                                          aria-label="Introduction"
                                                                          className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button"
                                                                          tabIndex={
                                                                            -1
                                                                          }
                                                                          type="button"
                                                                          style={{
                                                                            color:
                                                                              'rgb(255, 255, 255)',
                                                                            cursor:
                                                                              'pointer',
                                                                            height:
                                                                              '100%',
                                                                            fontSize:
                                                                              '10.5359px',
                                                                            left: '0.138301%',
                                                                            lineHeight:
                                                                              '1em',
                                                                            opacity: 0,
                                                                            pointerEvents:
                                                                              'auto',
                                                                            position:
                                                                              'absolute',
                                                                            textAlign:
                                                                              'center',
                                                                            top: '0px',
                                                                            transform:
                                                                              'translateX(-50%)',
                                                                            transition:
                                                                              'opacity 170ms ease 0s, transform 170ms ease 0s',
                                                                            width:
                                                                              '15.325px',
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              background:
                                                                                'rgb(255, 255, 255)',
                                                                              borderRadius:
                                                                                '50%',
                                                                              display:
                                                                                'block',
                                                                              height:
                                                                                '5px',
                                                                              left: '50%',
                                                                              position:
                                                                                'absolute',
                                                                              textIndent:
                                                                                '-99999em',
                                                                              top: '50%',
                                                                              transform:
                                                                                'translate(-50%, -50%)',
                                                                              width:
                                                                                '5px',
                                                                            }}
                                                                          >
                                                                            ●
                                                                          </span>
                                                                        </button>
                                                                        <button
                                                                          aria-label="Installing Chrome"
                                                                          className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button"
                                                                          tabIndex={
                                                                            -1
                                                                          }
                                                                          type="button"
                                                                          style={{
                                                                            color:
                                                                              'rgb(255, 255, 255)',
                                                                            cursor:
                                                                              'pointer',
                                                                            height:
                                                                              '100%',
                                                                            fontSize:
                                                                              '10.5359px',
                                                                            left: '13.0925%',
                                                                            lineHeight:
                                                                              '1em',
                                                                            opacity: 0,
                                                                            pointerEvents:
                                                                              'auto',
                                                                            position:
                                                                              'absolute',
                                                                            textAlign:
                                                                              'center',
                                                                            top: '0px',
                                                                            transform:
                                                                              'translateX(-50%)',
                                                                            transition:
                                                                              'opacity 170ms ease 0s, transform 170ms ease 0s',
                                                                            width:
                                                                              '15.325px',
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              background:
                                                                                'rgb(255, 255, 255)',
                                                                              borderRadius:
                                                                                '50%',
                                                                              display:
                                                                                'block',
                                                                              height:
                                                                                '5px',
                                                                              left: '50%',
                                                                              position:
                                                                                'absolute',
                                                                              textIndent:
                                                                                '-99999em',
                                                                              top: '50%',
                                                                              transform:
                                                                                'translate(-50%, -50%)',
                                                                              width:
                                                                                '5px',
                                                                            }}
                                                                          >
                                                                            ●
                                                                          </span>
                                                                        </button>
                                                                        <button
                                                                          aria-label="Installing VS Code"
                                                                          className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button"
                                                                          tabIndex={
                                                                            -1
                                                                          }
                                                                          type="button"
                                                                          style={{
                                                                            color:
                                                                              'rgb(255, 255, 255)',
                                                                            cursor:
                                                                              'pointer',
                                                                            height:
                                                                              '100%',
                                                                            fontSize:
                                                                              '10.5359px',
                                                                            left: '37.0619%',
                                                                            lineHeight:
                                                                              '1em',
                                                                            opacity: 0,
                                                                            pointerEvents:
                                                                              'auto',
                                                                            position:
                                                                              'absolute',
                                                                            textAlign:
                                                                              'center',
                                                                            top: '0px',
                                                                            transform:
                                                                              'translateX(-50%)',
                                                                            transition:
                                                                              'opacity 170ms ease 0s, transform 170ms ease 0s',
                                                                            width:
                                                                              '15.325px',
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              background:
                                                                                'rgb(255, 255, 255)',
                                                                              borderRadius:
                                                                                '50%',
                                                                              display:
                                                                                'block',
                                                                              height:
                                                                                '5px',
                                                                              left: '50%',
                                                                              position:
                                                                                'absolute',
                                                                              textIndent:
                                                                                '-99999em',
                                                                              top: '50%',
                                                                              transform:
                                                                                'translate(-50%, -50%)',
                                                                              width:
                                                                                '5px',
                                                                            }}
                                                                          >
                                                                            ●
                                                                          </span>
                                                                        </button>
                                                                        <button
                                                                          aria-label="Installing Extension"
                                                                          className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button"
                                                                          tabIndex={
                                                                            -1
                                                                          }
                                                                          type="button"
                                                                          style={{
                                                                            color:
                                                                              'rgb(255, 255, 255)',
                                                                            cursor:
                                                                              'pointer',
                                                                            height:
                                                                              '100%',
                                                                            fontSize:
                                                                              '10.5359px',
                                                                            left: '60.3167%',
                                                                            lineHeight:
                                                                              '1em',
                                                                            opacity: 0,
                                                                            pointerEvents:
                                                                              'auto',
                                                                            position:
                                                                              'absolute',
                                                                            textAlign:
                                                                              'center',
                                                                            top: '0px',
                                                                            transform:
                                                                              'translateX(-50%)',
                                                                            transition:
                                                                              'opacity 170ms ease 0s, transform 170ms ease 0s',
                                                                            width:
                                                                              '15.325px',
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              background:
                                                                                'rgb(255, 255, 255)',
                                                                              borderRadius:
                                                                                '50%',
                                                                              display:
                                                                                'block',
                                                                              height:
                                                                                '5px',
                                                                              left: '50%',
                                                                              position:
                                                                                'absolute',
                                                                              textIndent:
                                                                                '-99999em',
                                                                              top: '50%',
                                                                              transform:
                                                                                'translate(-50%, -50%)',
                                                                              width:
                                                                                '5px',
                                                                            }}
                                                                          >
                                                                            ●
                                                                          </span>
                                                                        </button>
                                                                      </div>
                                                                      <div
                                                                        className="w-storyboard-anchor"
                                                                        style={{
                                                                          height:
                                                                            '0px',
                                                                          left: '0px',
                                                                          position:
                                                                            'absolute',
                                                                          top: '0px',
                                                                          width:
                                                                            '100%',
                                                                        }}
                                                                      >
                                                                        <div
                                                                          className="w-storyboard"
                                                                          style={{
                                                                            bottom:
                                                                              '22.9875px',
                                                                            height:
                                                                              '81.0447px',
                                                                            left: '-71.721px',
                                                                            opacity: 0,
                                                                            overflow:
                                                                              'hidden',
                                                                            pointerEvents:
                                                                              'none',
                                                                            position:
                                                                              'absolute',
                                                                            transition:
                                                                              'opacity 150ms ease 0s, transform 1000ms cubic-bezier(0, 0.8, 0, 1) 0s',
                                                                            transform:
                                                                              'scale(0.83)',
                                                                            transformOrigin:
                                                                              'center bottom',
                                                                            width:
                                                                              '143.442px',
                                                                          }}
                                                                        >
                                                                          <img
                                                                            src="https://embed-ssl.wistia.com/deliveries/bfcfca226d3315e78744fe115a86fc68dfd09f19.bin"
                                                                            className="w-css-reset-max-width-none-important"
                                                                            alt=""
                                                                            style={{
                                                                              height:
                                                                                '1620.89px',
                                                                              left: '0px',
                                                                              position:
                                                                                'absolute',
                                                                              top: '0px',
                                                                              verticalAlign:
                                                                                'top',
                                                                              width:
                                                                                '1434.42px',
                                                                            }}
                                                                          />
                                                                          <div
                                                                            className="w-storyboard-time"
                                                                            style={{
                                                                              bottom:
                                                                                '0.5em',
                                                                              color:
                                                                                'rgb(255, 255, 255)',
                                                                              display:
                                                                                'inline-block',
                                                                              fontFamily:
                                                                                'WistiaPlayerInterNumbersSemiBold, Helvetica, sans-serif',
                                                                              fontSize:
                                                                                '12.4516px',
                                                                              left: '0px',
                                                                              lineHeight:
                                                                                '32.5656px',
                                                                              position:
                                                                                'absolute',
                                                                              textAlign:
                                                                                'center',
                                                                              width:
                                                                                '100%',
                                                                            }}
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                background:
                                                                                  'rgba(0, 0, 0, 0.7)',
                                                                                borderRadius:
                                                                                  '2.87344px',
                                                                                display:
                                                                                  'inline-block',
                                                                                lineHeight:
                                                                                  '1em',
                                                                                padding:
                                                                                  '5.74687px',
                                                                              }}
                                                                            >
                                                                              0:00
                                                                            </span>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                      <div
                                                                        className="w-playbar__chapter-titles"
                                                                        style={{
                                                                          height:
                                                                            '0px',
                                                                          left: '0px',
                                                                          pointerEvents:
                                                                            'none',
                                                                          position:
                                                                            'absolute',
                                                                          top: '0px',
                                                                          width:
                                                                            '100%',
                                                                        }}
                                                                      >
                                                                        <div
                                                                          className="w-chapter-title"
                                                                          style={{
                                                                            background:
                                                                              'rgba(0, 0, 0, 0.55)',
                                                                            bottom:
                                                                              '0px',
                                                                            boxSizing:
                                                                              'border-box',
                                                                            color:
                                                                              'rgb(255, 255, 255)',
                                                                            display:
                                                                              'none',
                                                                            fontFamily:
                                                                              'WistiaPlayerInter, Helvetica, sans-serif',
                                                                            fontSize:
                                                                              '14px',
                                                                            height:
                                                                              '24px',
                                                                            left: '0.649299px',
                                                                            lineHeight:
                                                                              '24px',
                                                                            padding:
                                                                              '0px 6px',
                                                                            position:
                                                                              'absolute',
                                                                            textAlign:
                                                                              'center',
                                                                            transform:
                                                                              'translateX(-50%)',
                                                                            whiteSpace:
                                                                              'nowrap',
                                                                          }}
                                                                        >
                                                                          Introduction
                                                                        </div>
                                                                        <div
                                                                          className="w-chapter-title"
                                                                          style={{
                                                                            background:
                                                                              'rgba(0, 0, 0, 0.55)',
                                                                            bottom:
                                                                              '0px',
                                                                            boxSizing:
                                                                              'border-box',
                                                                            color:
                                                                              'rgb(255, 255, 255)',
                                                                            display:
                                                                              'none',
                                                                            fontFamily:
                                                                              'WistiaPlayerInter, Helvetica, sans-serif',
                                                                            fontSize:
                                                                              '14px',
                                                                            height:
                                                                              '24px',
                                                                            left: '61.467px',
                                                                            lineHeight:
                                                                              '24px',
                                                                            padding:
                                                                              '0px 6px',
                                                                            position:
                                                                              'absolute',
                                                                            textAlign:
                                                                              'center',
                                                                            transform:
                                                                              'translateX(-50%)',
                                                                            whiteSpace:
                                                                              'nowrap',
                                                                          }}
                                                                        >
                                                                          Installing
                                                                          Chrome
                                                                        </div>
                                                                        <div
                                                                          className="w-chapter-title"
                                                                          style={{
                                                                            background:
                                                                              'rgba(0, 0, 0, 0.55)',
                                                                            bottom:
                                                                              '0px',
                                                                            boxSizing:
                                                                              'border-box',
                                                                            color:
                                                                              'rgb(255, 255, 255)',
                                                                            display:
                                                                              'none',
                                                                            fontFamily:
                                                                              'WistiaPlayerInter, Helvetica, sans-serif',
                                                                            fontSize:
                                                                              '14px',
                                                                            height:
                                                                              '24px',
                                                                            left: '173.999px',
                                                                            lineHeight:
                                                                              '24px',
                                                                            padding:
                                                                              '0px 6px',
                                                                            position:
                                                                              'absolute',
                                                                            textAlign:
                                                                              'center',
                                                                            transform:
                                                                              'translateX(-50%)',
                                                                            whiteSpace:
                                                                              'nowrap',
                                                                          }}
                                                                        >
                                                                          Installing
                                                                          VS
                                                                          Code
                                                                        </div>
                                                                        <div
                                                                          className="w-chapter-title"
                                                                          style={{
                                                                            background:
                                                                              'rgba(0, 0, 0, 0.55)',
                                                                            bottom:
                                                                              '0px',
                                                                            boxSizing:
                                                                              'border-box',
                                                                            color:
                                                                              'rgb(255, 255, 255)',
                                                                            display:
                                                                              'none',
                                                                            fontFamily:
                                                                              'WistiaPlayerInter, Helvetica, sans-serif',
                                                                            fontSize:
                                                                              '14px',
                                                                            height:
                                                                              '24px',
                                                                            left: '283.176px',
                                                                            lineHeight:
                                                                              '24px',
                                                                            padding:
                                                                              '0px 6px',
                                                                            position:
                                                                              'absolute',
                                                                            textAlign:
                                                                              'center',
                                                                            transform:
                                                                              'translateX(-50%)',
                                                                            whiteSpace:
                                                                              'nowrap',
                                                                          }}
                                                                        >
                                                                          Installing
                                                                          Extension
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div
                                                              className="w-bottom-bar-right w-css-reset"
                                                              style={{
                                                                display:
                                                                  'table-cell',
                                                                verticalAlign:
                                                                  'top',
                                                                position:
                                                                  'relative',
                                                                width: '0px',
                                                                opacity: 1,
                                                                transition:
                                                                  'opacity 0s ease 0s',
                                                                whiteSpace:
                                                                  'nowrap',
                                                              }}
                                                            >
                                                              <div
                                                                className="w-bottom-bar-right-inner-anchor w-css-reset"
                                                                style={{
                                                                  height:
                                                                    '33px',
                                                                  position:
                                                                    'relative',
                                                                  pointerEvents:
                                                                    'auto',
                                                                  whiteSpace:
                                                                    'nowrap',
                                                                  display:
                                                                    'inline-block',
                                                                  right: '0px',
                                                                  top: '0px',
                                                                  verticalAlign:
                                                                    'top',
                                                                }}
                                                              >
                                                                <div
                                                                  className="w-bottom-bar-right-inner w-css-reset"
                                                                  style={{
                                                                    height:
                                                                      '33px',
                                                                    position:
                                                                      'relative',
                                                                    pointerEvents:
                                                                      'auto',
                                                                    whiteSpace:
                                                                      'nowrap',
                                                                    display:
                                                                      'inline-block',
                                                                    opacity: 1,
                                                                    right:
                                                                      '0px',
                                                                    top: '0px',
                                                                    transform:
                                                                      'translateY(0px)',
                                                                    transition:
                                                                      'opacity 0ms ease 0s, transform 0ms ease 0s',
                                                                    paddingRight:
                                                                      '0px',
                                                                  }}
                                                                >
                                                                  <div
                                                                    className="w-css-reset"
                                                                    data-handle="captionsButton"
                                                                    style={{
                                                                      display:
                                                                        'inline-block',
                                                                      verticalAlign:
                                                                        'top',
                                                                    }}
                                                                  >
                                                                    <div
                                                                      className="w-vulcan-button-wrapper w-css-reset"
                                                                      style={{
                                                                        display:
                                                                          'inline-block',
                                                                        height:
                                                                          '33px',
                                                                        position:
                                                                          'relative',
                                                                        verticalAlign:
                                                                          'top',
                                                                        width:
                                                                          '38.3125px',
                                                                      }}
                                                                    >
                                                                      <button
                                                                        className="w-vulcan-v2-button w-css-reset w-css-reset-tree w-css-reset-button-important"
                                                                        tabIndex={
                                                                          0
                                                                        }
                                                                        aria-expanded="false"
                                                                        aria-label="Show captions menu"
                                                                        title="Show captions menu"
                                                                        style={{
                                                                          backgroundColor:
                                                                            'rgba(0, 0, 0, 0)',
                                                                          borderRadius:
                                                                            '0px',
                                                                          boxShadow:
                                                                            'none',
                                                                          cursor:
                                                                            'pointer',
                                                                          height:
                                                                            '100%',
                                                                          position:
                                                                            'relative',
                                                                          transition:
                                                                            'background-color 150ms ease 0s',
                                                                          width:
                                                                            'calc(100% + 0px)',
                                                                          paddingRight:
                                                                            '0px',
                                                                        }}
                                                                      >
                                                                        <div
                                                                          className="w-vulcan-icon-wrapper"
                                                                          data-handle="captionsButton_icon_wrapper"
                                                                          style={{
                                                                            boxSizing:
                                                                              'border-box',
                                                                            height:
                                                                              '100%',
                                                                            position:
                                                                              'relative',
                                                                            opacity: 1,
                                                                            transform:
                                                                              'scale(1.001)',
                                                                            transition:
                                                                              'transform 200ms ease 0s',
                                                                          }}
                                                                        >
                                                                          <svg
                                                                            x="0px"
                                                                            y="0px"
                                                                            viewBox="0 0 40 34"
                                                                            enableBackground="new 0 0 40 34"
                                                                            aria-hidden="true"
                                                                            style={{
                                                                              fill: 'rgb(255, 255, 255)',
                                                                              height:
                                                                                '100%',
                                                                              left: '0px',
                                                                              strokeWidth:
                                                                                '0px',
                                                                              top: '0px',
                                                                              width:
                                                                                '100%',
                                                                            }}
                                                                          >
                                                                            <g>
                                                                              <path
                                                                                fill="none"
                                                                                stroke="#ffffff"
                                                                                strokeLinecap="round"
                                                                                strokeMiterlimit={
                                                                                  10
                                                                                }
                                                                                strokeWidth="1.8"
                                                                                d="M18.4,18.7c-0.5,0.7-1.1,1.2-2.1,1.2c-1.3,0-2.4-1.1-2.4-2.8c0-1.6,1-2.8,2.4-2.8c1,0,1.6,0.5,2,1.2"
                                                                              />
                                                                            </g>
                                                                            <g>
                                                                              <path
                                                                                fill="none"
                                                                                stroke="#ffffff"
                                                                                strokeLinecap="round"
                                                                                strokeMiterlimit={
                                                                                  10
                                                                                }
                                                                                strokeWidth="1.8"
                                                                                d="M25.8,18.7c-0.5,0.7-1.1,1.2-2.1,1.2c-1.3,0-2.4-1.1-2.4-2.8c0-1.6,1-2.8,2.4-2.8c1,0,1.6,0.5,2,1.2"
                                                                              />
                                                                            </g>
                                                                            <g>
                                                                              <path
                                                                                fill="none"
                                                                                stroke="#ffffff"
                                                                                strokeLinecap="round"
                                                                                strokeMiterlimit={
                                                                                  10
                                                                                }
                                                                                strokeWidth={
                                                                                  2
                                                                                }
                                                                                d="M31,21.9c0,1.6-1.4,3-3,3H12c-1.6,0-3-1.4-3-3V12c0-1.6,1.4-3,3-3h16c1.6,0,3,1.4,3,3V21.9z"
                                                                              />
                                                                            </g>
                                                                          </svg>
                                                                        </div>
                                                                      </button>
                                                                    </div>
                                                                  </div>
                                                                  <div
                                                                    className="w-css-reset"
                                                                    data-handle="volumeButton"
                                                                    style={{
                                                                      display:
                                                                        'inline-block',
                                                                      verticalAlign:
                                                                        'top',
                                                                    }}
                                                                  >
                                                                    <div
                                                                      className="w-vulcan-button-wrapper w-css-reset"
                                                                      style={{
                                                                        display:
                                                                          'inline-block',
                                                                        height:
                                                                          '33px',
                                                                        position:
                                                                          'relative',
                                                                        verticalAlign:
                                                                          'top',
                                                                        width:
                                                                          '38.3125px',
                                                                      }}
                                                                    >
                                                                      <button
                                                                        className="w-vulcan-v2-button w-css-reset w-css-reset-tree w-css-reset-button-important"
                                                                        tabIndex={
                                                                          0
                                                                        }
                                                                        aria-label="Mute"
                                                                        title="Mute"
                                                                        style={{
                                                                          backgroundColor:
                                                                            'rgba(0, 0, 0, 0)',
                                                                          borderRadius:
                                                                            '0px',
                                                                          boxShadow:
                                                                            'none',
                                                                          cursor:
                                                                            'pointer',
                                                                          height:
                                                                            '100%',
                                                                          position:
                                                                            'relative',
                                                                          transition:
                                                                            'background-color 150ms ease 0s',
                                                                          width:
                                                                            'calc(100% + 0px)',
                                                                          paddingRight:
                                                                            '0px',
                                                                        }}
                                                                      >
                                                                        <div
                                                                          className="w-vulcan-icon-wrapper"
                                                                          data-handle="volumeButton_icon_wrapper"
                                                                          style={{
                                                                            boxSizing:
                                                                              'border-box',
                                                                            height:
                                                                              '100%',
                                                                            position:
                                                                              'relative',
                                                                            opacity: 1,
                                                                            transform:
                                                                              'scale(1.001)',
                                                                            transition:
                                                                              'transform 200ms ease 0s',
                                                                          }}
                                                                        >
                                                                          <svg
                                                                            x="0px"
                                                                            y="0px"
                                                                            viewBox="0 0 40 34"
                                                                            enableBackground="new 0 0 40 34"
                                                                            aria-hidden="true"
                                                                            style={{
                                                                              fill: 'rgb(255, 255, 255)',
                                                                              height:
                                                                                '100%',
                                                                              left: '0px',
                                                                              strokeWidth:
                                                                                '0px',
                                                                              top: '0px',
                                                                              width:
                                                                                '100%',
                                                                            }}
                                                                          >
                                                                            <g
                                                                              style={{
                                                                                transform:
                                                                                  'translateX(1.25px)',
                                                                                transition:
                                                                                  'transform 100ms ease 0s',
                                                                              }}
                                                                            >
                                                                              <g>
                                                                                <path d="M13.8,14.2c-0.5,0.5-1.4,0.8-2,0.8h-1.6C9.5,15,9,15.5,9,16.2v1.6c0,0.7,0.5,1.2,1.2,1.2h1.6c0.7,0,1.6,0.4,2,0.8l2.3,2.3c0.5,0.5,0.8,0.3,0.8-0.4v-9.6c0-0.7-0.4-0.8-0.8-0.4L13.8,14.2z" />
                                                                              </g>
                                                                              <g>
                                                                                <path
                                                                                  fill="none"
                                                                                  stroke="#ffffff"
                                                                                  stroke-line-cap="round"
                                                                                  strokeMiterlimit={
                                                                                    10
                                                                                  }
                                                                                  strokeWidth={
                                                                                    2
                                                                                  }
                                                                                  d="M22,11.7c0,0,1.1,2.5,1.1,5s-1.1,5-1.1,5"
                                                                                  style={{
                                                                                    opacity: 1,
                                                                                    transition:
                                                                                      'opacity 100ms ease 0s',
                                                                                  }}
                                                                                />
                                                                                <path
                                                                                  fill="none"
                                                                                  stroke="#ffffff"
                                                                                  stroke-line-cap="round"
                                                                                  strokeMiterlimit={
                                                                                    10
                                                                                  }
                                                                                  strokeWidth={
                                                                                    2
                                                                                  }
                                                                                  d="M25.8,9.2c0,0,1.7,3.8,1.7,7.5c0,3.7-1.7,7.5-1.7,7.5"
                                                                                  style={{
                                                                                    opacity: 1,
                                                                                    transition:
                                                                                      'opacity 100ms ease 0s',
                                                                                  }}
                                                                                />
                                                                              </g>
                                                                              <g
                                                                                style={{
                                                                                  opacity: 0,
                                                                                  transition:
                                                                                    'opacity 100ms ease 0s',
                                                                                }}
                                                                              >
                                                                                <line
                                                                                  fill="none"
                                                                                  stroke="#ffffff"
                                                                                  stroke-line-cap="round"
                                                                                  strokeMiterlimit={
                                                                                    10
                                                                                  }
                                                                                  strokeWidth="1.8102"
                                                                                  x1="19.2"
                                                                                  y1={
                                                                                    15
                                                                                  }
                                                                                  x2="23.2"
                                                                                  y2={
                                                                                    19
                                                                                  }
                                                                                />
                                                                                <line
                                                                                  fill="none"
                                                                                  stroke="#ffffff"
                                                                                  stroke-line-cap="round"
                                                                                  strokeMiterlimit={
                                                                                    10
                                                                                  }
                                                                                  strokeWidth="1.8102"
                                                                                  x1="19.2"
                                                                                  y1={
                                                                                    19
                                                                                  }
                                                                                  x2="23.2"
                                                                                  y2={
                                                                                    15
                                                                                  }
                                                                                />
                                                                              </g>
                                                                            </g>
                                                                          </svg>
                                                                        </div>
                                                                      </button>
                                                                    </div>
                                                                  </div>
                                                                  <div
                                                                    className="w-css-reset"
                                                                    data-handle="volumeSlider"
                                                                    style={{
                                                                      display:
                                                                        'inline-block',
                                                                      verticalAlign:
                                                                        'top',
                                                                    }}
                                                                  >
                                                                    <div
                                                                      className="w-css-reset w-css-reset-tree"
                                                                      style={{
                                                                        position:
                                                                          'relative',
                                                                        zIndex: 1,
                                                                      }}
                                                                    >
                                                                      <div
                                                                        aria-label="Volume Slider"
                                                                        aria-orientation="vertical"
                                                                        aria-valuemax={
                                                                          100
                                                                        }
                                                                        aria-valuemin={
                                                                          0
                                                                        }
                                                                        aria-valuenow={
                                                                          100
                                                                        }
                                                                        className="w-slider-wrapper w-css-reset w-css-reset-tree"
                                                                        role="slider"
                                                                        tabIndex={
                                                                          0
                                                                        }
                                                                        title="Volume Slider"
                                                                        style={{
                                                                          background:
                                                                            'rgba(0, 0, 0, 0.7)',
                                                                          borderRadius:
                                                                            '0px',
                                                                          bottom:
                                                                            '0px',
                                                                          boxShadow:
                                                                            'none',
                                                                          boxSizing:
                                                                            'content-box',
                                                                          cursor:
                                                                            'pointer',
                                                                          height:
                                                                            '110px',
                                                                          opacity: 0,
                                                                          outline:
                                                                            'none',
                                                                          right:
                                                                            '99999px',
                                                                          position:
                                                                            'absolute',
                                                                          width:
                                                                            '40px',
                                                                          transition:
                                                                            'opacity 170ms ease 0s',
                                                                        }}
                                                                      >
                                                                        <div
                                                                          className="w-volume-track"
                                                                          style={{
                                                                            background:
                                                                              'rgb(255, 255, 255)',
                                                                            borderRadius:
                                                                              '1px',
                                                                            height:
                                                                              '72.73%',
                                                                            left: '50%',
                                                                            position:
                                                                              'absolute',
                                                                            top: '13.635%',
                                                                            transform:
                                                                              'translate(-50%)',
                                                                            width:
                                                                              '2px',
                                                                          }}
                                                                        />
                                                                        <div
                                                                          className="w-volume-grabber"
                                                                          style={{
                                                                            background:
                                                                              'transparent',
                                                                            borderRadius:
                                                                              '50%',
                                                                            height:
                                                                              '20px',
                                                                            left: '50%',
                                                                            position:
                                                                              'absolute',
                                                                            top: '13.635%',
                                                                            transform:
                                                                              'translate(-51%, -50%) scale(0.85)',
                                                                            transition:
                                                                              'transform 100ms ease 0s',
                                                                            width:
                                                                              '20px',
                                                                          }}
                                                                        >
                                                                          <div
                                                                            style={{
                                                                              background:
                                                                                'rgba(0, 0, 0, 0.8)',
                                                                              border:
                                                                                '2px solid rgb(255, 255, 255)',
                                                                              borderRadius:
                                                                                '50%',
                                                                              height:
                                                                                '40%',
                                                                              left: '50%',
                                                                              position:
                                                                                'absolute',
                                                                              top: '50%',
                                                                              transform:
                                                                                'translate(-50%, -50%)',
                                                                              width:
                                                                                '40%',
                                                                            }}
                                                                          />
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                  <div
                                                                    className="w-css-reset"
                                                                    data-handle="settingsButton"
                                                                    style={{
                                                                      display:
                                                                        'inline-block',
                                                                      verticalAlign:
                                                                        'top',
                                                                    }}
                                                                  >
                                                                    <div
                                                                      className="w-vulcan-button-wrapper w-css-reset"
                                                                      style={{
                                                                        display:
                                                                          'inline-block',
                                                                        height:
                                                                          '33px',
                                                                        position:
                                                                          'relative',
                                                                        verticalAlign:
                                                                          'top',
                                                                        width:
                                                                          '38.3125px',
                                                                      }}
                                                                    >
                                                                      <button
                                                                        className="w-vulcan-v2-button w-css-reset w-css-reset-tree w-css-reset-button-important"
                                                                        tabIndex={
                                                                          0
                                                                        }
                                                                        aria-expanded="false"
                                                                        aria-label="Show settings menu"
                                                                        title="Show settings menu"
                                                                        style={{
                                                                          backgroundColor:
                                                                            'rgba(0, 0, 0, 0)',
                                                                          borderRadius:
                                                                            '0px',
                                                                          boxShadow:
                                                                            'none',
                                                                          cursor:
                                                                            'pointer',
                                                                          height:
                                                                            '100%',
                                                                          position:
                                                                            'relative',
                                                                          transition:
                                                                            'background-color 150ms ease 0s',
                                                                          width:
                                                                            'calc(100% + 0px)',
                                                                          paddingRight:
                                                                            '0px',
                                                                        }}
                                                                      >
                                                                        <div
                                                                          className="w-vulcan-icon-wrapper"
                                                                          data-handle="settingsButton_icon_wrapper"
                                                                          style={{
                                                                            boxSizing:
                                                                              'border-box',
                                                                            height:
                                                                              '100%',
                                                                            position:
                                                                              'relative',
                                                                            opacity: 1,
                                                                            transform:
                                                                              'scale(1.001)',
                                                                            transition:
                                                                              'transform 200ms ease 0s',
                                                                          }}
                                                                        >
                                                                          <svg
                                                                            x="0px"
                                                                            y="0px"
                                                                            viewBox="0 0 40 34"
                                                                            enableBackground="new 0 0 40 34"
                                                                            aria-hidden="true"
                                                                            style={{
                                                                              fill: 'rgb(255, 255, 255)',
                                                                              height:
                                                                                '100%',
                                                                              left: '0px',
                                                                              strokeWidth:
                                                                                '0px',
                                                                              top: '0px',
                                                                              width:
                                                                                '100%',
                                                                            }}
                                                                          >
                                                                            <g>
                                                                              <g>
                                                                                <path d="M28.3,16.4h-1.9c-0.4,0-0.8-0.3-0.9-0.7l-0.4-1.1c-0.2-0.3-0.1-0.8,0.2-1.1l1.3-1.3c0.3-0.3,0.3-0.7,0-1l-0.4-0.4c-0.3-0.3-0.7-0.3-1,0l-1.3,1.3c-0.3,0.3-0.8,0.3-1.1,0.1l-1.1-0.5c-0.4-0.1-0.7-0.5-0.7-0.9V9.1c0-0.4-0.3-0.7-0.7-0.7h-0.6c-0.4,0-0.7,0.3-0.7,0.7v1.7c0,0.4-0.3,0.8-0.7,0.9l-1.2,0.5c-0.3,0.2-0.8,0.1-1.1-0.2l-1.2-1.2c-0.3-0.3-0.7-0.3-1,0l-0.4,0.4c-0.3,0.3-0.3,0.7,0,1l1.2,1.2c0.3,0.3,0.3,0.8,0.1,1.1l-0.5,1.2c-0.1,0.4-0.5,0.7-0.9,0.7h-1.6c-0.4,0-0.7,0.3-0.7,0.7v0.6c0,0.4,0.3,0.7,0.7,0.7h1.6c0.4,0,0.8,0.3,0.9,0.7l0.5,1.2c0.2,0.3,0.1,0.8-0.1,1.1l-1.2,1.2c-0.3,0.3-0.3,0.7,0,1l0.4,0.4c0.3,0.3,0.7,0.3,1,0l1.2-1.2c0.3-0.3,0.8-0.3,1.1-0.2l1.2,0.5c0.4,0.1,0.7,0.5,0.7,0.9v1.7c0,0.4,0.3,0.7,0.7,0.7h0.6c0.4,0,0.7-0.3,0.7-0.7V24c0-0.4,0.3-0.8,0.7-0.9l1.1-0.5c0.3-0.2,0.8-0.1,1.1,0.1l1.3,1.3c0.3,0.3,0.7,0.3,1,0l0.4-0.4c0.3-0.3,0.3-0.7,0-1l-1.3-1.3C25,21,25,20.5,25.1,20.2l0.4-1.1c0.1-0.4,0.5-0.7,0.9-0.7h1.9c0.4,0,0.7-0.3,0.7-0.7v-0.6C29,16.7,28.7,16.4,28.3,16.4z M23.8,17.5c0,2.2-1.8,3.9-3.9,3.9c-2.2,0-3.9-1.8-3.9-3.9s1.7-3.9,3.9-3.9C22.1,13.6,23.8,15.3,23.8,17.5z" />
                                                                              </g>
                                                                            </g>
                                                                          </svg>
                                                                        </div>
                                                                      </button>
                                                                    </div>
                                                                  </div>
                                                                  <div
                                                                    className="w-css-reset"
                                                                    data-handle="chapters"
                                                                    style={{
                                                                      display:
                                                                        'inline-block',
                                                                      verticalAlign:
                                                                        'top',
                                                                    }}
                                                                  >
                                                                    <div
                                                                      className="w-vulcan-button-wrapper w-css-reset"
                                                                      style={{
                                                                        display:
                                                                          'inline-block',
                                                                        height:
                                                                          '33px',
                                                                        position:
                                                                          'relative',
                                                                        verticalAlign:
                                                                          'top',
                                                                        width:
                                                                          '38.3125px',
                                                                      }}
                                                                    >
                                                                      <button
                                                                        className="w-vulcan-v2-button w-css-reset w-css-reset-tree w-css-reset-button-important"
                                                                        tabIndex={
                                                                          0
                                                                        }
                                                                        aria-expanded="false"
                                                                        style={{
                                                                          backgroundColor:
                                                                            'rgba(0, 0, 0, 0)',
                                                                          borderRadius:
                                                                            '0px',
                                                                          boxShadow:
                                                                            'none',
                                                                          cursor:
                                                                            'pointer',
                                                                          height:
                                                                            '100%',
                                                                          position:
                                                                            'relative',
                                                                          transition:
                                                                            'background-color 150ms ease 0s',
                                                                          width:
                                                                            'calc(100% + 0px)',
                                                                          paddingRight:
                                                                            '0px',
                                                                        }}
                                                                        aria-label="Open chapters"
                                                                        title="Open chapters"
                                                                      >
                                                                        <div
                                                                          className="w-vulcan-icon-wrapper"
                                                                          data-handle="chapters_icon_wrapper"
                                                                          style={{
                                                                            boxSizing:
                                                                              'border-box',
                                                                            height:
                                                                              '100%',
                                                                            position:
                                                                              'relative',
                                                                            opacity: 1,
                                                                            transform:
                                                                              'scale(1.001)',
                                                                            transition:
                                                                              'transform 200ms ease 0s',
                                                                          }}
                                                                        >
                                                                          <div
                                                                            style={{
                                                                              height:
                                                                                '100%',
                                                                            }}
                                                                          >
                                                                            <svg
                                                                              x="0px"
                                                                              y="0px"
                                                                              viewBox="0 0 40 34"
                                                                              enableBackground="new 0 0 40 34"
                                                                              aria-hidden="true"
                                                                              style={{
                                                                                fill: 'rgb(255, 255, 255)',
                                                                                height:
                                                                                  '100%',
                                                                                left: '0px',
                                                                                strokeWidth:
                                                                                  '0px',
                                                                                top: '0px',
                                                                                width:
                                                                                  '100%',
                                                                              }}
                                                                            >
                                                                              <g>
                                                                                <g>
                                                                                  <circle
                                                                                    cx="10.6"
                                                                                    cy="10.1"
                                                                                    r="1.6"
                                                                                  />
                                                                                  <path d="M29.5,10.1c0,0.6-0.5,1.1-1.1,1.1H15.7c-0.6,0-1.1-0.5-1.1-1.1l0,0c0-0.6,0.5-1.1,1.1-1.1h12.7C29,9.1,29.5,9.5,29.5,10.1L29.5,10.1z" />
                                                                                </g>
                                                                                <g>
                                                                                  <circle
                                                                                    cx="10.6"
                                                                                    cy="16.8"
                                                                                    r="1.6"
                                                                                  />
                                                                                  <path d="M29.5,16.8c0,0.6-0.5,1.1-1.1,1.1H15.7c-0.6,0-1.1-0.5-1.1-1.1l0,0c0-0.6,0.5-1.1,1.1-1.1h12.7C29,15.7,29.5,16.2,29.5,16.8L29.5,16.8z" />
                                                                                </g>
                                                                                <g>
                                                                                  <circle
                                                                                    cx="10.6"
                                                                                    cy="23.4"
                                                                                    r="1.6"
                                                                                  />
                                                                                  <path d="M29.5,23.4c0,0.6-0.5,1.1-1.1,1.1H15.7c-0.6,0-1.1-0.5-1.1-1.1l0,0c0-0.6,0.5-1.1,1.1-1.1h12.7C29,22.4,29.5,22.9,29.5,23.4L29.5,23.4z" />
                                                                                </g>
                                                                              </g>
                                                                            </svg>
                                                                          </div>
                                                                        </div>
                                                                      </button>
                                                                    </div>
                                                                  </div>
                                                                  <div
                                                                    className="w-css-reset"
                                                                    data-handle="fullscreenControl"
                                                                    style={{
                                                                      display:
                                                                        'inline-block',
                                                                      verticalAlign:
                                                                        'top',
                                                                    }}
                                                                  >
                                                                    <div
                                                                      className="w-vulcan-button-wrapper w-css-reset"
                                                                      style={{
                                                                        display:
                                                                          'inline-block',
                                                                        height:
                                                                          '33px',
                                                                        position:
                                                                          'relative',
                                                                        verticalAlign:
                                                                          'top',
                                                                        width:
                                                                          '38.3125px',
                                                                      }}
                                                                    >
                                                                      <button
                                                                        className="w-vulcan-v2-button w-css-reset w-css-reset-tree w-css-reset-button-important"
                                                                        tabIndex={
                                                                          0
                                                                        }
                                                                        aria-label="Fullscreen"
                                                                        title="Fullscreen"
                                                                        style={{
                                                                          backgroundColor:
                                                                            'rgba(0, 0, 0, 0)',
                                                                          borderRadius:
                                                                            '0px',
                                                                          boxShadow:
                                                                            'none',
                                                                          cursor:
                                                                            'pointer',
                                                                          height:
                                                                            '100%',
                                                                          position:
                                                                            'relative',
                                                                          transition:
                                                                            'background-color 150ms ease 0s',
                                                                          width:
                                                                            'calc(100% + 0px)',
                                                                          paddingRight:
                                                                            '0px',
                                                                        }}
                                                                      >
                                                                        <div
                                                                          className="w-vulcan-icon-wrapper"
                                                                          data-handle="fullscreenControl_icon_wrapper"
                                                                          style={{
                                                                            boxSizing:
                                                                              'border-box',
                                                                            height:
                                                                              '100%',
                                                                            position:
                                                                              'relative',
                                                                            opacity: 1,
                                                                            transform:
                                                                              'scale(1.001)',
                                                                            transition:
                                                                              'transform 200ms ease 0s',
                                                                          }}
                                                                        >
                                                                          <svg
                                                                            x="0px"
                                                                            y="0px"
                                                                            viewBox="0 0 40 34"
                                                                            enableBackground="new 0 0 40 34"
                                                                            aria-hidden="true"
                                                                            style={{
                                                                              fill: 'rgb(255, 255, 255)',
                                                                              height:
                                                                                '100%',
                                                                              left: '0px',
                                                                              strokeWidth:
                                                                                '0px',
                                                                              top: '0px',
                                                                              width:
                                                                                '100%',
                                                                            }}
                                                                          >
                                                                            <g>
                                                                              <g>
                                                                                <polyline
                                                                                  fill="none"
                                                                                  stroke="#ffffff"
                                                                                  strokeWidth={
                                                                                    2
                                                                                  }
                                                                                  strokeLinecap="round"
                                                                                  strokeLinejoin="round"
                                                                                  strokeMiterlimit={
                                                                                    10
                                                                                  }
                                                                                  points="31.4,12.6 31.4,8.7 25.8,8.7"
                                                                                />
                                                                                <polyline
                                                                                  fill="none"
                                                                                  stroke="#ffffff"
                                                                                  strokeWidth={
                                                                                    2
                                                                                  }
                                                                                  strokeLinecap="round"
                                                                                  strokeLinejoin="round"
                                                                                  strokeMiterlimit={
                                                                                    10
                                                                                  }
                                                                                  points="14.7,8.7 9.1,8.7 9.1,12.6"
                                                                                />
                                                                                <polyline
                                                                                  fill="none"
                                                                                  stroke="#ffffff"
                                                                                  strokeWidth={
                                                                                    2
                                                                                  }
                                                                                  strokeLinecap="round"
                                                                                  strokeLinejoin="round"
                                                                                  strokeMiterlimit={
                                                                                    10
                                                                                  }
                                                                                  points="25.8,24.8 31.4,24.8 31.4,20.9"
                                                                                />
                                                                                <polyline
                                                                                  fill="none"
                                                                                  stroke="#ffffff"
                                                                                  strokeWidth={
                                                                                    2
                                                                                  }
                                                                                  strokeLinecap="round"
                                                                                  strokeLinejoin="round"
                                                                                  strokeMiterlimit={
                                                                                    10
                                                                                  }
                                                                                  points="9.1,20.9 9.1,24.8 14.7,24.8"
                                                                                />
                                                                              </g>
                                                                              <rect
                                                                                x="13.7"
                                                                                y="12.3"
                                                                                fill="none"
                                                                                stroke="#ffffff"
                                                                                strokeWidth={
                                                                                  2
                                                                                }
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeMiterlimit={
                                                                                  10
                                                                                }
                                                                                enableBackground="new"
                                                                                width="13.3"
                                                                                height="8.9"
                                                                              />
                                                                            </g>
                                                                          </svg>
                                                                        </div>
                                                                      </button>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div
                                                                className="w-ellipsis w-css-reset"
                                                                style={{
                                                                  height:
                                                                    '33px',
                                                                  position:
                                                                    'relative',
                                                                  pointerEvents:
                                                                    'auto',
                                                                  whiteSpace:
                                                                    'nowrap',
                                                                  display:
                                                                    'none',
                                                                }}
                                                              />
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div
                                                          className="w-foreground w-css-reset"
                                                          style={{
                                                            height: '100%',
                                                            left: '0px',
                                                            pointerEvents:
                                                              'none',
                                                            position:
                                                              'absolute',
                                                            top: '0px',
                                                            width: '100%',
                                                          }}
                                                        >
                                                          <div
                                                            className="w-css-reset"
                                                            data-handle="contextMenu"
                                                            style={{
                                                              pointerEvents:
                                                                'auto',
                                                            }}
                                                          />
                                                          <div
                                                            className="w-css-reset"
                                                            data-handle="loadingHourglass"
                                                            style={{
                                                              pointerEvents:
                                                                'auto',
                                                            }}
                                                          />
                                                          <div
                                                            className="w-css-reset"
                                                            data-handle="focusOutline"
                                                            style={{
                                                              pointerEvents:
                                                                'auto',
                                                            }}
                                                          >
                                                            <div
                                                              className="w-focus-outline"
                                                              style={{
                                                                boxShadow:
                                                                  'rgb(255, 255, 255) 0px 0px 0px 2px inset',
                                                                borderRadius:
                                                                  '0px',
                                                                display: 'none',
                                                                height: '100%',
                                                                left: '0px',
                                                                pointerEvents:
                                                                  'none',
                                                                position:
                                                                  'absolute',
                                                                right: '0px',
                                                                width: '100%',
                                                              }}
                                                            />
                                                          </div>
                                                          <div
                                                            className="w-css-reset"
                                                            data-handle="modalOverlay"
                                                            style={{
                                                              pointerEvents:
                                                                'auto',
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                      <style
                                                        id="wistia_414_style"
                                                        type="text/css"
                                                        className="wistia_injected_style"
                                                        dangerouslySetInnerHTML={{
                                                          __html:
                                                            '\n      #wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset{font-size:14px;}\n#wistia_chrome_402 #wistia_grid_408_wrapper div.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper span.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper label.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper fieldset.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper button.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper img.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper a.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper svg.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper p.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper a.w-css-reset{border:0;}\n#wistia_chrome_402 #wistia_grid_408_wrapper h1.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper h2.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper h3.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper p.w-css-reset{margin:1.4em 0;}\n#wistia_chrome_402 #wistia_grid_408_wrapper a.w-css-reset{display:inline;}\n#wistia_chrome_402 #wistia_grid_408_wrapper span.w-css-reset{display:inline;}\n#wistia_chrome_402 #wistia_grid_408_wrapper svg.w-css-reset{display:inline;}\n#wistia_chrome_402 #wistia_grid_408_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper ol.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper ul:before.w-css-reset{display:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper ol:before.w-css-reset{display:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper li:before.w-css-reset{display:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper ul:after.w-css-reset{display:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper ol:after.w-css-reset{display:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper li:after.w-css-reset{display:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper label.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper button.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}\n#wistia_chrome_402 #wistia_grid_408_wrapper img.w-css-reset{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset button::-moz-focus-inner{border: 0;}\n      #wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree {font-size:14px;}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree div{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree span{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree label{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree fieldset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree button{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree img{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree a{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree svg{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree p{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree a{border:0;}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree h1{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree h2{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree h3{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree p{margin:1.4em 0;}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree a{display:inline;}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree span{display:inline;}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree svg{display:inline;}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree ol{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree ul:before{display:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree ol:before{display:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree li:before{display:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree ul:after{display:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree ol:after{display:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree li:after{display:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree label{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree button{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree img{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}\n#wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-tree  button::-moz-focus-inner{border: 0;}\n      #wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-max-width-none-important{max-width:none!important}\n      #wistia_chrome_402 #wistia_grid_408_wrapper .w-css-reset-button-important{border-radius:0!important;color:#fff!important;}\n    ',
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div id="wistia_grid_408_front" />
                                                  <div id="wistia_grid_408_top_inside">
                                                    <div
                                                      id="wistia_grid_408_top"
                                                      style={{
                                                        height: '0px',
                                                        fontSize: '0px',
                                                        lineHeight: '0px',
                                                      }}
                                                    >
                                                      {' '}
                                                    </div>
                                                  </div>
                                                  <div id="wistia_grid_408_bottom_inside">
                                                    <div
                                                      id="wistia_grid_408_bottom"
                                                      style={{
                                                        height: '0px',
                                                        fontSize: '0px',
                                                        lineHeight: '0px',
                                                      }}
                                                    >
                                                      {' '}
                                                    </div>
                                                  </div>
                                                  <div id="wistia_grid_408_left_inside">
                                                    <div
                                                      id="wistia_grid_408_left"
                                                      style={{
                                                        height: '0px',
                                                        fontSize: '0px',
                                                        lineHeight: '0px',
                                                      }}
                                                    >
                                                      {' '}
                                                    </div>
                                                  </div>
                                                  <div id="wistia_grid_408_right_inside">
                                                    <div
                                                      id="wistia_grid_408_right"
                                                      style={{
                                                        height: '0px',
                                                        fontSize: '0px',
                                                        lineHeight: '0px',
                                                      }}
                                                    >
                                                      {' '}
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  id="wistia_grid_408_below"
                                                  style={{
                                                    height: '0px',
                                                    fontSize: '0px',
                                                    lineHeight: '0px',
                                                  }}
                                                >
                                                  {' '}
                                                </div>
                                                <style
                                                  id="wistia_409_style"
                                                  type="text/css"
                                                  className="wistia_injected_style"
                                                  dangerouslySetInnerHTML={{
                                                    __html:
                                                      '#wistia_grid_408_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}\n#wistia_grid_408_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}\n#wistia_grid_408_above{position:relative;}\n#wistia_grid_408_main{display:block;height:100%;position:relative;}\n#wistia_grid_408_behind{height:100%;left:0;position:absolute;top:0;width:100%;}\n#wistia_grid_408_center{height:100%;overflow:hidden;position:relative;width:100%;}\n#wistia_grid_408_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}\n#wistia_grid_408_top_inside{position:absolute;left:0;top:0;width:100%;}\n#wistia_grid_408_top{width:100%;position:absolute;bottom:0;left:0;}\n#wistia_grid_408_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}\n#wistia_grid_408_bottom{width:100%;position:absolute;top:0;left:0;}\n#wistia_grid_408_left_inside{height:100%;position:absolute;left:0;top:0;}\n#wistia_grid_408_left{height:100%;position:absolute;right:0;top:0;}\n#wistia_grid_408_right_inside{height:100%;right:0;position:absolute;top:0;}\n#wistia_grid_408_right{height:100%;left:0;position:absolute;top:0;}\n#wistia_grid_408_below{position:relative;}',
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="grid gap-3">
                                        <h6 className="MuiTypography-root MuiTypography-h6 css-woh9c2">
                                          Setting Up Your Computer for Coding
                                        </h6>
                                        <p className="MuiTypography-root MuiTypography-body1 css-1rtjmg0">
                                          To get started at BloomTech and be
                                          successful in your full-stack journey,
                                          it's essential to have two key pieces
                                          of software installed on your
                                          computer: <strong>VSCode</strong>{' '}
                                          &amp; <strong>Google Chrome</strong>.
                                          These tools are industry standards and
                                          will be vital for your learning
                                          experience.
                                        </p>
                                        <h6 className="MuiTypography-root MuiTypography-h6 css-woh9c2">
                                          Step-by-Step Guide
                                        </h6>
                                        <ol className="grid gap-2">
                                          <li>
                                            Watch the Video
                                            <br />
                                            Begin by watching the provided
                                            video, which will guide you through
                                            the the process of downloading and
                                            installing VSCode and Chrome.
                                          </li>
                                          <li>
                                            Enter the Code
                                            <br />
                                            Once both pieces of software are
                                            installed, follow along with the
                                            video to enter your code in the box
                                            below. This will ensure your
                                            development environment is properly
                                            set up. By following these steps,
                                            you'll have your computer set up and
                                            ready for coding in no time!
                                          </li>
                                        </ol>
                                        <div>
                                          <form
                                            method="post"
                                            action="/rft"
                                            id="environment-setup"
                                            aria-label="Environment Setup"
                                            data-dashlane-rid="35dad42e2563a685"
                                            data-form-type="other"
                                          >
                                            <label
                                              htmlFor="env-setup-hash"
                                              className="block mb-1"
                                            >
                                              Submit output from{' '}
                                              <strong>
                                                BloomTech Env Setup
                                              </strong>{' '}
                                              VSCode extension:
                                            </label>
                                            <div className="flex gap-2 items-center mt-2">
                                              <div className="MuiFormControl-root MuiTextField-root w-full css-i44wyl">
                                                <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl MuiInputBase-sizeSmall css-lg5hhr">
                                                  <input
                                                    aria-invalid="false"
                                                    id="env-setup-hash"
                                                    name="hash"
                                                    placeholder="Paste your code here"
                                                    type="text"
                                                    className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall css-o4qvae"
                                                    defaultValue
                                                    data-dashlane-rid="2ff453a24008a63f"
                                                    data-form-type="other"
                                                  />
                                                  <fieldset
                                                    aria-hidden="true"
                                                    className="MuiOutlinedInput-notchedOutline css-qi0mll"
                                                  >
                                                    <legend className="css-ihdtdm">
                                                      <span className="notranslate">
                                                        ​
                                                      </span>
                                                    </legend>
                                                  </fieldset>
                                                </div>
                                              </div>
                                              <button
                                                className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium Mui-disabled MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-6sjkol"
                                                tabIndex={-1}
                                                type="submit"
                                                disabled
                                                data-dashlane-rid="0a4d216a6fd04c09"
                                                data-form-type="action"
                                              >
                                                Submit
                                              </button>
                                            </div>
                                            <input
                                              type="hidden"
                                              name="environmentSetUpAssignmentId"
                                              defaultValue="80378d4f-6872-4751-b108-058f22d4a3a4"
                                            />
                                            <input
                                              type="hidden"
                                              name="sprintId"
                                              defaultValue="JDS_WEB_s0_v2::ORIENTATION"
                                            />
                                            <input
                                              type="hidden"
                                              name="sprintEnrollmentId"
                                              defaultValue="2769491d-1c99-4d11-9587-693d1b57cde4"
                                            />
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-3 mt-3">
                                    <p className="MuiTypography-root MuiTypography-body2 css-yxwwhr">
                                      Download Links:
                                    </p>
                                    <a
                                      className="MuiTypography-root MuiTypography-body2 MuiLink-root MuiLink-underlineAlways css-2mk042"
                                      href="https://support.google.com/chrome/answer/95346?hl=en&co=GENIE.Platform%3DDesktop"
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Google Chrome
                                    </a>
                                    <a
                                      className="MuiTypography-root MuiTypography-body2 MuiLink-root MuiLink-underlineAlways css-2mk042"
                                      href="https://code.visualstudio.com/download"
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      VSCode
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiAccordion-root MuiAccordion-rounded Mui-expanded css-1tpmecz">
                    <div
                      className="MuiButtonBase-root MuiAccordionSummary-root Mui-expanded css-1uaukoe"
                      tabIndex={0}
                      role="button"
                      aria-expanded="true"
                    >
                      <div className="MuiAccordionSummary-content Mui-expanded css-1n11r91">
                        <div className="w-full flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="MuiButtonBase-root MuiCheckbox-root MuiCheckbox-colorSuccess MuiCheckbox-sizeMedium PrivateSwitchBase-root MuiCheckbox-root MuiCheckbox-colorSuccess MuiCheckbox-sizeMedium MuiCheckbox-root MuiCheckbox-colorSuccess MuiCheckbox-sizeMedium hover:bg-transparent css-1f85jhy">
                              <input
                                className="PrivateSwitchBase-input css-1m9pwf3"
                                readOnly
                                type="checkbox"
                                data-indeterminate="false"
                              />
                              <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="CheckBoxOutlineBlankIcon"
                              >
                                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                              </svg>
                            </span>
                            <h5 className="MuiTypography-root MuiTypography-h5 css-1swsley">
                              Complete your Enrollment Checklist
                            </h5>
                          </div>
                          <div className="MuiChip-root MuiChip-filled MuiChip-sizeSmall MuiChip-colorError MuiChip-filledError mr-2 css-9qrquz">
                            <span className="MuiChip-label MuiChip-labelSmall css-1jdkvty">
                              * Required
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="MuiAccordionSummary-expandIconWrapper Mui-expanded css-1fx8m19">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-6 text-dark-silver"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-entered css-c4sutr"
                      style={{
                        minHeight: '0px',
                        height: 'auto',
                        transitionDuration: '229ms',
                      }}
                    >
                      <div className="MuiCollapse-wrapper MuiCollapse-vertical css-hboir5">
                        <div className="MuiCollapse-wrapperInner MuiCollapse-vertical css-8atqhb">
                          <div role="region" className="MuiAccordion-region">
                            <div className="MuiAccordionDetails-root css-j24qc6">
                              <div className="bg-charcoal p-4 rounded-sm mb-4">
                                <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                                  <p className="MuiTypography-root MuiTypography-body1 css-1rtjmg0">
                                    Make it official and start your journey
                                    today! Your enrollment checklist will walk
                                    you through all the requirements to get
                                    started.
                                  </p>
                                  <div>
                                    <a
                                      className="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways css-12afirh"
                                      href="/enrollment-checklist"
                                    >
                                      Go to Enrollment Checklist
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="MuiTypography-root MuiTypography-h4 mb-3 css-a24p1z">
                  Explore your Free Trial
                </h2>
                <div>
                  <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiAccordion-root MuiAccordion-rounded Mui-expanded css-1tpmecz">
                    <div
                      className="MuiButtonBase-root MuiAccordionSummary-root Mui-expanded css-1uaukoe"
                      tabIndex={0}
                      role="button"
                      aria-expanded="true"
                    >
                      <div className="MuiAccordionSummary-content Mui-expanded css-1n11r91">
                        <div className="w-full flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="MuiButtonBase-root MuiCheckbox-root MuiCheckbox-colorSuccess MuiCheckbox-sizeMedium PrivateSwitchBase-root MuiCheckbox-root MuiCheckbox-colorSuccess MuiCheckbox-sizeMedium MuiCheckbox-root MuiCheckbox-colorSuccess MuiCheckbox-sizeMedium hover:bg-transparent css-1f85jhy">
                              <input
                                className="PrivateSwitchBase-input css-1m9pwf3"
                                readOnly
                                type="checkbox"
                                data-indeterminate="false"
                              />
                              <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="CheckBoxOutlineBlankIcon"
                              >
                                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                              </svg>
                            </span>
                            <h5 className="MuiTypography-root MuiTypography-h5 css-1swsley">
                              Attend a live class
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="MuiAccordionSummary-expandIconWrapper Mui-expanded css-1fx8m19">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-6 text-dark-silver"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-entered css-c4sutr"
                      style={{
                        minHeight: '0px',
                        height: 'auto',
                        transitionDuration: '310ms',
                      }}
                    >
                      <div className="MuiCollapse-wrapper MuiCollapse-vertical css-hboir5">
                        <div className="MuiCollapse-wrapperInner MuiCollapse-vertical css-8atqhb">
                          <div role="region" className="MuiAccordion-region">
                            <div className="MuiAccordionDetails-root css-j24qc6">
                              <div className="bg-charcoal p-4 rounded-sm mb-4">
                                <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                                  <p className="MuiTypography-root MuiTypography-body1 css-1rtjmg0">
                                    Join our hands-on and interactive classes
                                    where participants learn specific skills and
                                    knowledge in real-time.
                                  </p>
                                  <div>
                                    <a
                                      className="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways css-12afirh"
                                      href="/live-events"
                                    >
                                      View all Classes
                                    </a>
                                  </div>
                                </div>
                                <div>
                                  <div className="py-2 w-full flex gap-4">
                                    <div className="flex flex-col">
                                      <div>
                                        Code-Along 1: Start Coding- Intro to
                                        HTML &amp; CSS
                                      </div>
                                      <div className="whitespace-nowrap">
                                        <span className="text-silver">
                                          Tomorrow
                                        </span>{' '}
                                        <span className="inline-flex w-0.5 h-0.5 rounded-full bg-white align-middle mx-2" />
                                        <span className="text-silver">
                                          3:00 AM
                                        </span>{' '}
                                        <span className="inline-flex w-0.5 h-0.5 rounded-full bg-white align-middle mx-2" />
                                        <span className="text-silver">
                                          50 mins
                                        </span>
                                      </div>
                                    </div>
                                    <div className="grow flex justify-end h-[1.6rem]">
                                      <form
                                        method="post"
                                        action="/api/live-events?index"
                                      >
                                        <input
                                          type="hidden"
                                          name="eventId"
                                          defaultValue="f6bb9c0b-8ec9-4c19-bbdb-555f14e25dee"
                                        />
                                        <button
                                          className="cursor-pointer relative flex justify-center items-center rounded px-5 py-2 font-semibold tracking-wider uppercase undefined bg-royal-blue hover:brightness-90 active:brightness-90 text-sm w-28 bg-royal-blue py-1.5 rounded text-xs"
                                          title="Sign up for live event"
                                          aria-label="Sign up for event Code-Along 1: Start Coding- Intro to HTML & CSS"
                                          type="submit"
                                          name="_action"
                                          value="register"
                                        >
                                          Register
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                  <hr className="border-dark-gray" />
                                </div>
                                <div>
                                  <div className="py-2 w-full flex gap-4">
                                    <div className="flex flex-col">
                                      <div>
                                        Code-Along 1: Start Coding- Intro to
                                        HTML &amp; CSS
                                      </div>
                                      <div className="whitespace-nowrap">
                                        <span className="text-silver">
                                          Tuesday
                                        </span>{' '}
                                        <span className="inline-flex w-0.5 h-0.5 rounded-full bg-white align-middle mx-2" />
                                        <span className="text-silver">
                                          3:00 AM
                                        </span>{' '}
                                        <span className="inline-flex w-0.5 h-0.5 rounded-full bg-white align-middle mx-2" />
                                        <span className="text-silver">
                                          50 mins
                                        </span>
                                      </div>
                                    </div>
                                    <div className="grow flex justify-end h-[1.6rem]">
                                      <form
                                        method="post"
                                        action="/api/live-events?index"
                                      >
                                        <input
                                          type="hidden"
                                          name="eventId"
                                          defaultValue="e4f88245-7f9f-49d1-9c89-eb81e58e8d13"
                                        />
                                        <button
                                          className="cursor-pointer relative flex justify-center items-center rounded px-5 py-2 font-semibold tracking-wider uppercase undefined bg-royal-blue hover:brightness-90 active:brightness-90 text-sm w-28 bg-royal-blue py-1.5 rounded text-xs"
                                          title="Sign up for live event"
                                          aria-label="Sign up for event Code-Along 1: Start Coding- Intro to HTML & CSS"
                                          type="submit"
                                          name="_action"
                                          value="register"
                                        >
                                          Register
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                  <hr className="border-dark-gray" />
                                </div>
                                <div>
                                  <div className="py-2 w-full flex gap-4">
                                    <div className="flex flex-col">
                                      <div>
                                        Code-Along 1: Start Coding- Intro to
                                        HTML &amp; CSS
                                      </div>
                                      <div className="whitespace-nowrap">
                                        <span className="text-silver">
                                          Thursday
                                        </span>{' '}
                                        <span className="inline-flex w-0.5 h-0.5 rounded-full bg-white align-middle mx-2" />
                                        <span className="text-silver">
                                          4:00 AM
                                        </span>{' '}
                                        <span className="inline-flex w-0.5 h-0.5 rounded-full bg-white align-middle mx-2" />
                                        <span className="text-silver">
                                          50 mins
                                        </span>
                                      </div>
                                    </div>
                                    <div className="grow flex justify-end h-[1.6rem]">
                                      <form
                                        method="post"
                                        action="/api/live-events?index"
                                      >
                                        <input
                                          type="hidden"
                                          name="eventId"
                                          defaultValue="6e219e68-1858-4c1e-bdff-e2dcea7c5e52"
                                        />
                                        <button
                                          className="cursor-pointer relative flex justify-center items-center rounded px-5 py-2 font-semibold tracking-wider uppercase undefined bg-royal-blue hover:brightness-90 active:brightness-90 text-sm w-28 bg-royal-blue py-1.5 rounded text-xs"
                                          title="Sign up for live event"
                                          aria-label="Sign up for event Code-Along 1: Start Coding- Intro to HTML & CSS"
                                          type="submit"
                                          name="_action"
                                          value="register"
                                        >
                                          Register
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                  <hr className="border-dark-gray" />
                                </div>
                                <div>
                                  <div className="py-2 w-full flex gap-4">
                                    <div className="flex flex-col">
                                      <div>
                                        Code-Along 1: Start Coding- Intro to
                                        HTML &amp; CSS
                                      </div>
                                      <div className="whitespace-nowrap">
                                        <span className="text-silver">
                                          Friday
                                        </span>{' '}
                                        <span className="inline-flex w-0.5 h-0.5 rounded-full bg-white align-middle mx-2" />
                                        <span className="text-silver">
                                          3:00 AM
                                        </span>{' '}
                                        <span className="inline-flex w-0.5 h-0.5 rounded-full bg-white align-middle mx-2" />
                                        <span className="text-silver">
                                          50 mins
                                        </span>
                                      </div>
                                    </div>
                                    <div className="grow flex justify-end h-[1.6rem]">
                                      <form
                                        method="post"
                                        action="/api/live-events?index"
                                      >
                                        <input
                                          type="hidden"
                                          name="eventId"
                                          defaultValue="600d2ae1-1e77-49e3-aebf-a2cfff5b54e3"
                                        />
                                        <button
                                          className="cursor-pointer relative flex justify-center items-center rounded px-5 py-2 font-semibold tracking-wider uppercase undefined bg-royal-blue hover:brightness-90 active:brightness-90 text-sm w-28 bg-royal-blue py-1.5 rounded text-xs"
                                          title="Sign up for live event"
                                          aria-label="Sign up for event Code-Along 1: Start Coding- Intro to HTML & CSS"
                                          type="submit"
                                          name="_action"
                                          value="register"
                                        >
                                          Register
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiAccordion-root MuiAccordion-rounded Mui-expanded css-1tpmecz">
                    <div
                      className="MuiButtonBase-root MuiAccordionSummary-root Mui-expanded css-1uaukoe"
                      tabIndex={0}
                      role="button"
                      aria-expanded="true"
                    >
                      <div className="MuiAccordionSummary-content Mui-expanded css-1n11r91">
                        <div className="w-full flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="MuiButtonBase-root MuiCheckbox-root MuiCheckbox-colorSuccess MuiCheckbox-sizeMedium PrivateSwitchBase-root MuiCheckbox-root MuiCheckbox-colorSuccess MuiCheckbox-sizeMedium MuiCheckbox-root MuiCheckbox-colorSuccess MuiCheckbox-sizeMedium hover:bg-transparent css-1f85jhy">
                              <input
                                className="PrivateSwitchBase-input css-1m9pwf3"
                                readOnly
                                type="checkbox"
                                data-indeterminate="false"
                              />
                              <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="CheckBoxOutlineBlankIcon"
                              >
                                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                              </svg>
                            </span>
                            <h5 className="MuiTypography-root MuiTypography-h5 css-1swsley">
                              Start your free course
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="MuiAccordionSummary-expandIconWrapper Mui-expanded css-1fx8m19">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-6 text-dark-silver"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-entered css-c4sutr"
                      style={{
                        minHeight: '0px',
                        height: 'auto',
                        transitionDuration: '229ms',
                      }}
                    >
                      <div className="MuiCollapse-wrapper MuiCollapse-vertical css-hboir5">
                        <div className="MuiCollapse-wrapperInner MuiCollapse-vertical css-8atqhb">
                          <div role="region" className="MuiAccordion-region">
                            <div className="MuiAccordionDetails-root css-j24qc6">
                              <div className="bg-charcoal p-4 rounded-sm mb-4">
                                <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                                  <p className="MuiTypography-root MuiTypography-body1 css-1rtjmg0">
                                    Learn the basics of HTML, CSS, and
                                    Javascript and build your first webpage!
                                  </p>
                                  <div>
                                    <a
                                      className="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways css-12afirh"
                                      href="./courses/free-trial"
                                    >
                                      Go to Course
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="footer"
          className="mt-auto w-full flex bg-dark-gray py-3 px-7 uppercase"
        >
          <div className="flex w-full items-center justify-center text-xs md:text-sm text-silver">
            <span>
              Copyright {/* */}2024{/* */} Bloom Institute of Technology
            </span>
            <a
              href="https://www.bloomtech.com/terms-of-use"
              target="_blank"
              rel="noreferrer"
              className="link !text-silver mr-10 ml-10 whitespace-nowrap"
            >
              <div className="flex items-center">
                Terms of use
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="text-silver w-4 ml-3"
                    aria-label="External link"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </a>
            <a
              href="https://www.bloomtech.com/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className="link !text-silver whitespace-nowrap"
            >
              <div className="flex items-center">
                Privacy Policy
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="text-silver w-4 ml-3"
                    aria-label="External link"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step3;
