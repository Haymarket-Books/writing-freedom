<script>
    import { slide, fade } from 'svelte/transition';
    import {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
    } from "@rgossiaux/svelte-headlessui";
</script>

<Disclosure class="disclosure" let:open>
  <DisclosureButton class="disclosure-button">
    <div class="question-wrapper">
        <slot name="question">Question?</slot>
    </div>
    
    {#if open}
    <div transition:slide>
        <DisclosurePanel static>
            <div class="answer-wrapper">
                <slot name="answer">Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit ad cum exercitationem rem praesentium odit nemo
              dolore? Accusamus, id non.</slot>
            </div>
        </DisclosurePanel>
    </div>
  {/if}
</DisclosureButton>
</Disclosure>

<style>
    .question-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: var(--font-secondary);
        font-weight: var(--font-weight-semi);
        background-color: var(--color-primary-100);
        color: var(--color-primary-800);
        line-height: 1.3;
        padding: 1.25rem 1.75rem;
        border-radius: var(--rounded-corners);
        font-size: var(--step-1);
        width: 100%;
        transition: background-color 0.2s ease;
    }

    .question-wrapper:hover {
        background-color: var(--color-primary-200);
    }

    .answer-wrapper {
        padding: 2rem;
    }
/* 
    .chevron {
        --svg-fill: var(--color-primary-400);
        transform: var(--disclosure-toggle);
        transition: transform 0.2s ease;
    } */

    @media (max-width: 640px) {
        .answer-wrapper {
            padding: 2rem 1rem;
        }

        .question-wrapper {
            gap: 1rem;
        }
    }
</style>