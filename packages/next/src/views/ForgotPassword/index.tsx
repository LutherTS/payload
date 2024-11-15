import type { AdminViewProps } from 'payload'

import { Button, LinkTransition } from '@payloadcms/ui'
import { formatAdminURL, Translation } from '@payloadcms/ui/shared'
import React, { Fragment } from 'react'

import { FormHeader } from '../../elements/FormHeader/index.js'
import { ForgotPasswordForm } from './ForgotPasswordForm/index.js'

export { generateForgotPasswordMetadata } from './meta.js'

export const forgotPasswordBaseClass = 'forgot-password'

export const ForgotPasswordView: React.FC<AdminViewProps> = ({ initPageResult }) => {
  const {
    req: {
      i18n,
      payload: { config },
      user,
    },
  } = initPageResult

  const {
    admin: {
      routes: { account: accountRoute, login: loginRoute },
    },
    routes: { admin: adminRoute },
  } = config

  if (user) {
    return (
      <Fragment>
        <FormHeader
          description={
            <Translation
              elements={{
                '0': ({ children }) => (
                  <LinkTransition
                    href={formatAdminURL({
                      adminRoute,
                      path: accountRoute,
                    })}
                    prefetch={false}
                  >
                    {children}
                  </LinkTransition>
                ),
              }}
              i18nKey="authentication:loggedInChangePassword"
              t={i18n.t}
            />
          }
          heading={i18n.t('authentication:alreadyLoggedIn')}
        />
        <Button
          buttonStyle="secondary"
          el="link"
          Link={LinkTransition}
          size="large"
          to={adminRoute}
        >
          {i18n.t('general:backToDashboard')}
        </Button>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <ForgotPasswordForm />
      <LinkTransition
        href={formatAdminURL({
          adminRoute,
          path: loginRoute,
        })}
        prefetch={false}
      >
        {i18n.t('authentication:backToLogin')}
      </LinkTransition>
    </Fragment>
  )
}
