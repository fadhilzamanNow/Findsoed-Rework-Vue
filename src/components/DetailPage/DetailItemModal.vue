<script setup lang="ts">
import { Flex, Modal, ModalProps } from "ant-design-vue";
import { computed } from "vue";
import { itemLocationType } from "../../api/Post/Post";

type PostType = {
  itemName: string;
  itemDetail: string;
  userName: string;
  itemCategory: string;
  status: string;
  images: string[];
  likeNum: number;
  commentNum: number;
  id: string;
  userProfile: string;
  coordinate: itemLocationType;
};

interface DetailPostTypes extends PostType {
  itemLostDate: string;
  phoneNumber: string;
  statusName: string;
}

const { postDetail, isModalOpen } = defineProps<{
  postDetail: DetailPostTypes | undefined;
  isModalOpen: boolean;
}>();

const emits = defineEmits<{ toggleModal: [] }>();

const modalDetailProps = computed<ModalProps>(() => ({
  open: isModalOpen,
  title: postDetail?.itemName,
  centered: true,
  footer: null,
  onCancel: () => emits("toggleModal"),
}));
</script>

<template>
  <Modal v-bind="modalDetailProps">
    <Flex vertical gap="20">
      <div class="grid grid-cols-2">
        <Flex vertical gap="4">
          <h1 class="text-xs font-medium">Kategori</h1>
          <span class="font-light text-xs">
            {{ postDetail?.itemCategory }}
          </span>
        </Flex>
        <Flex vertical gap="4">
          <h1 class="text-xs font-medium">Kontak</h1>
          <span class="font-light text-xs">
            {{ postDetail?.phoneNumber }}
          </span>
        </Flex>
      </div>
      <div class="grid grid-cols-2">
        <Flex vertical gap="4">
          <h1 class="text-xs font-medium">Tanggal Hilang</h1>
          <span class="font-light text-xs">
            {{ postDetail?.itemLostDate }}
          </span>
        </Flex>
        <Flex vertical gap="4">
          <h1 class="text-xs font-medium">Status Barang</h1>
          <span
            :class="`px-2 py-0.5 rounded-md text-white  max-w-max text-xs',
          ${postDetail?.statusName === 'Hilang' ? 'bg-red-500' : 'bg-green-400'}
          `"
          >
            {{ postDetail?.statusName }}
          </span>
        </Flex>
      </div>
      <Flex vertical gap="4">
        <h1 class="text-xs font-medium">Deskripsi</h1>
        <span
          class="max-w-[350px] overflow-x-hidden hover:overflow-y-scroll text-xs font-light"
        >
          {{ postDetail?.itemDetail }}
        </span>
      </Flex>
    </Flex>
  </Modal>
</template>
