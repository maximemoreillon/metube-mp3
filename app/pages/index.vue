<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="url">
      <FormItem>
        <FormLabel>URL</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="https://www.youtube.com/watch?v=TrfRirITYlk&list=RDTrfRirITYlk&start_radio=1"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>URL of the YouTube video</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex justify-center">
      <Button type="submit" :disabled="pending" size="lg">
        <Spinner class="animate-spin" v-if="pending" />
        <MusicIcon v-else />
        Convert to Mp3
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { MusicIcon } from "@lucide/vue";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "vue-sonner";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const pending = ref(false);
const formSchema = toTypedSchema(
  z.object({
    url: z.string().url(),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async ({ url: rawUrl }) => {
  // TODO: consider doing this in the back-end
  const url = new URL(rawUrl);
  const v = url.searchParams.get("v");
  if (!v) throw new Error("Missing v");
  url.search = new URLSearchParams({ v }).toString();

  pending.value = true;
  try {
    await $fetch("/api/download", {
      method: "POST",
      body: { url: url.toString() },
    });

    toast.success("Success");
    form.resetForm();
  } catch (error: any) {
    toast.error(error.toString());
  } finally {
    pending.value = false;
  }
});
</script>
