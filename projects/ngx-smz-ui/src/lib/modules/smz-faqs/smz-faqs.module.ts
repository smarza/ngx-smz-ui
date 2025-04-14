import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmzFaqsComponent } from './featured/faqs/smz-faqs.component';
import { FaqsContentComponent } from './components/faqs-content/faqs-content.component';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { SearchFaqsPipe } from './pipes/search-faqs.pipe';
import { FormsModule } from '@angular/forms';
import { HighlightSearch } from './pipes/highlight.pipe';
import { NgxsModule } from '@ngxs/store';
import { FaqsDbState } from './state/faqs.state';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SmzFaqsConfig } from './smz-faqs.config';
import { SmzMessagesModule } from '../smz-messages/smz-messages.module';
import { NgxSmzFormsModule } from '../smz-forms/smz-forms.module';
import { RbkAccessControlModule } from '../rbk-utils/auth/guards/access-control.module';

const initial: SmzFaqsConfig =
{
    databaseCacheTimeout: 10,
    creationClaim: 'CAN_CREATE_COMMENTS',
    endpoint: '',
    placeholders: {
        searchTitle: 'Como posso ajuda-lo ?',
        searchPlaceholder: 'Digite palavras-chave para buscar respostas',
        contentTitle: 'Peguntas Frequentes ?',
        creationTitle: 'Adicionar Conhecimento ?',
        emptyMessage: 'Nenhum conteúdo foi encontrado.',
        creationMessage: 'Seja o primeiro a criar um conteúdo.',
        supportMessage: 'Caso precise, procure o suporte ou o administrador do seu sistema.',
        noSearchResultsMessage: 'Refine sua busca e tente novamente.'
    },
    layouts: {
        positions: {
            'top': '10%',
            'middle': '48%',
            'bottom': '80%',
        }
    }
}

export const ngxsModuleForFeatureFaqsDbState = NgxsModule.forFeature([FaqsDbState]);

@NgModule({
    declarations: [
        SmzFaqsComponent,
        FaqsContentComponent,
        SearchFaqsPipe,
        HighlightSearch,
        SafeHtmlPipe
    ],
    imports: [
        CommonModule,
        SmzMessagesModule,
        NgxSmzFormsModule,
        ButtonModule,
        AccordionModule,
        InputTextModule,
        FormsModule,
        ngxsModuleForFeatureFaqsDbState,
        RbkAccessControlModule
    ],
    exports: [
        SmzFaqsComponent
    ],
})
export class NgxSmzFaqsModule {

    public static forRoot(configuration: SmzFaqsConfig): ModuleWithProviders<NgxSmzFaqsModule>{
        // console.log('configuration...', configuration);
        return {
            ngModule: NgxSmzFaqsModule,
            providers: [
                {
                    provide: SmzFaqsConfig,
                    useValue: { ...initial, ...configuration}
                }
            ]
        };
    }
}
