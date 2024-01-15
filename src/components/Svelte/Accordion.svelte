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
    <div class:open class="question-wrapper" style="--bottom-radius:{open ? "0" : "var(--rounded-corners)"}">
        <slot name="question">Question?</slot>
        <span class:open class="icon" style="--disclosure-toggle:{open && "rotate(90deg)"}">
            <i class="fa-regular fa-chevron-right"></i>
        </span>
    </div>
    </DisclosureButton>
    
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
</Disclosure>

<style>
    .question-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: var(--font-heading);
        font-weight: var(--font-heading-weight);
        background-color: var(--color-white);
        padding: 1.25rem 1.75rem;
        border-top-left-radius: var(--rounded-corners);
        border-top-right-radius: var(--rounded-corners);
        border-bottom-left-radius: var(--bottom-radius);
        border-bottom-right-radius: var(--bottom-radius);
        font-size: var(--step-0);
        transition: background-color 0.2s ease;
    }

    .question-wrapper:hover {
        background-color: color-mix(in srgb, var(--color-white), transparent 30%);
    }

    .answer-wrapper {
        padding: 0.5rem 2rem 2rem;
        background-color: var(--color-white);
        border-bottom-left-radius: var(--rounded-corners);
        border-bottom-right-radius: var(--rounded-corners);
    }

    .icon {
        color: var(--color-accent-base);
        transform: var(--disclosure-toggle);
        transition: transform 0.2s ease-out;
    }

    @media (max-width: 640px) {
        .answer-wrapper {
            padding: 2rem 1rem;
        }

        .question-wrapper {
            gap: 1rem;
        }
    }
</style>